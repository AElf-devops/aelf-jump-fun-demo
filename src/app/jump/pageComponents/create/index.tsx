"use client";
import { useRouter } from "next/navigation";
import { Input } from "aelf-design";
import { Button, message as antdMessage, Upload, Form } from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { useAWSUploadService } from "../../utils/S3";
import type { UploadProps } from "antd/es/upload/interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { JUMP_FUN_CONFIG } from "../../config";
import { BalanceData, DataResponse, TokenInfoData } from "../../types";
import { CONTRACT_ADDRESS } from "../../configOnline";
import { formatTokenAmount } from "../../utils/addressFormat";
import debounce from "lodash.debounce";
import { fetcher } from "../../utils/fetcher";
import BigNumber from "bignumber.js";

const CreateForm: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState(false);
  const { walletInfo, callViewMethod, callSendMethod } = useConnectWallet();
  // upload image
  const [uploadUrl, setUploadUrl] = useState("");
  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    if (!fileList || !fileList.length) {
      setUploadUrl("");
      return;
    }
    const file = fileList[0];
    setLoading(file.status === "uploading");
    if (file.status === "uploading") {
      antdMessage.loading("uploading");
    }
    if (file.status === "done") {
      antdMessage.success(`${file.name || ""} file uploaded successfully.`);
      setUploadUrl(file.response?.url);
    }
  };
  const { awsUploadFile } = useAWSUploadService();
  const customUpload = async ({
    file,
    onSuccess,
    onError,
  }: UploadRequestOption) => {
    try {
      const uploadFile = await awsUploadFile(file as File);
      onSuccess &&
        onSuccess({
          url: uploadFile,
        });
    } catch (error) {
      onError && onError(error as Error);
    }
  };
  const beforeUpload = async (file: File) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/svg+xml";
    if (!isJpgOrPng) {
      antdMessage.error("You can only upload JPG/PNG/SVG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      antdMessage.error("Image must smaller than 100MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  // get balance
  const [balanceData, setBalanceData] = useState<BalanceData>();

  const getBalance = useCallback(async () => {
    try {
      setLoading(true);
      const rs = await callViewMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "GetBalance",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
          owner: walletInfo?.address as string,
        },
      });
      return rs;
    } catch (e) {
      return 0;
    } finally {
      setLoading(false);
    }
  }, [callViewMethod, walletInfo?.address]);

  // get decimal
  const [decimal, setDecimal] = useState<number>(JUMP_FUN_CONFIG.DECIMAL);
  const getDecimal = useCallback(async () => {
    try {
      setLoading(true);
      const rs = await callViewMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "GetTokenInfo",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
        },
      });
      return rs;
    } catch (e) {
      return JUMP_FUN_CONFIG.SYMBOL;
    } finally {
      setLoading(false);
    }
  }, [callViewMethod]);

  useEffect(() => {
    const getInfo = async () => {
      const balanceRes = await getBalance();
      setBalanceData((balanceRes as DataResponse<BalanceData>)?.data);
    };
    getInfo();
  }, [getBalance, walletInfo]);

  useEffect(() => {
    const getInfo = async () => {
      const decimalRes = await getDecimal();
      console.log(decimalRes, "decimalRes");
      setDecimal((decimalRes as DataResponse<TokenInfoData>)?.data?.decimals);
    };
    getInfo();
  }, [getDecimal, walletInfo]);

  // token name
  const [tokenName, setTokenName] = useState<string>("");
  const handleTokenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTokenName(inputValue);
  };

  // symbol
  const [symbolInfo, setSymbolInfo] = useState<any>({});
  const [error, setError] = useState("");
  const debouncedChange = useCallback(
    debounce(async (input: string) => {
      if (!input) return;
      // get symbol price
      try {
        const {
          code,
          data,
          message: msg,
        } = await fetcher(
          "https://test.eforest.finance/symbolmarket/api/app/seed/search-symbol-info",
          {
            queryParams: {
              symbol: input,
              tokenType: "FT",
            },
          }
        );
        if (code === "20000") {
          setSymbolInfo(data);
        } else {
          setSymbolInfo(data);
          antdMessage.error(msg);
        }
      } catch (e) {
        console.error(e, "get symbol price");
      }
    }, 500),
    []
  );
  const [symbol, setSymbol] = useState<string>("");
  const regex = /^[A-Z]{1,10}$/;
  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue && !regex.test(inputValue)) {
      setError(
        "The maximum length of token symbol supported is 10. Please search for a shorter symbol."
      );
      setSymbol(inputValue.slice(0, inputValue.length - 1));
      inputValue.slice(0, inputValue.length - 1) !== symbol &&
        debouncedChange(inputValue.slice(0, inputValue.length - 1));
    } else {
      setError("");
      setSymbol(inputValue);
      inputValue !== symbol && debouncedChange(inputValue);
    }
  };
  const handleSymbolBlur = () => {
    if (regex.test(symbol)) {
      setError("");
    }
  };

  // button
  const disabled = useMemo(() => {
    return (
      !walletInfo?.address ||
      !tokenName ||
      !symbol ||
      !uploadUrl ||
      new BigNumber(symbolInfo?.tokenPrice?.amount).gt(
        new BigNumber(balanceData?.balance || Infinity)
      )
    );
  }, [tokenName, symbol, uploadUrl, walletInfo?.address]);
  const createToken = async () => {
    try {
      setLoading(true);
      const amount = symbolInfo.tokenPrice.amount;
      // approve
      const approveRs: any = await callSendMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "Approve",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
          spender: CONTRACT_ADDRESS.JUMPFUN,
          amount: new BigNumber(amount)
            .times(new BigNumber(10).pow(decimal))
            .toString(),
        },
      });

      if (!approveRs.error && approveRs.data.Status === "MINED") {
        await callSendMethod({
          chainId: JUMP_FUN_CONFIG.CHAIN_ID,
          contractAddress: CONTRACT_ADDRESS.JUMPFUN,
          methodName: "Create",
          args: {
            symbol,
            tokenName: tokenName,
            imageUri: uploadUrl,
            cost: new BigNumber(amount)
              .times(new BigNumber(10).pow(decimal))
              .toString(),
          },
        });
        antdMessage.success("Create success");
        setTimeout(() => {
          router.push("/jump");
        }, 500);
      } else {
        throw new Error("Approve failed");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        antdMessage.error(e.message);
      } else {
        antdMessage.error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center relative w-[1358px] m-auto">
      <button
        onClick={handleBack}
        className="text-white text-lg flex mb-6 absolute left-0 justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-bold">Back</span>
      </button>
      <div className="w-full max-w-2xl bg-[#000000C0] p-8 rounded-lg shadow-lg mt-8 mb-10">
        {/* Form */}
        <Form layout="vertical">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Create
          </h1>

          {/* Token Image */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Token Image
            </label>
            <div className="flex justify-center items-center h-40 ">
              <Upload
                accept=".jpeg,.jpg,.png,.svg"
                maxCount={1}
                listType="picture-card"
                customRequest={customUpload}
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                <div className="text-white font-semibold">+ Add</div>
              </Upload>
            </div>
          </div>

          {/* Token Name and Ticker */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Form.Item
              label={
                <label className="block text-sm font-semibold text-white mb-2">
                  Token Name
                </label>
              }
            >
              <Input
                type="text"
                value={tokenName}
                placeholder="e.g. JUMP.FUN"
                onChange={handleTokenNameChange}
              />
            </Form.Item>
            <Form.Item
              label={
                <label className="block text-sm font-semibold text-white mb-2">
                  Seed
                </label>
              }
              validateStatus={error ? "error" : "success"}
              help={error || ""}
            >
              <Input
                type="text"
                value={symbol}
                placeholder="e.g. JUMP"
                onChange={handleSymbolChange}
                onBlur={handleSymbolBlur}
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <Button
              className="!w-full !p-3 !h-[54px] !rounded-full !border !border-black !bg-[#0E8DF5] !shadow-[2px_2px_0_0_#000] !font-bold"
              disabled={disabled}
              type="primary"
              onClick={createToken}
              loading={loading}
            >
              Create ({symbolInfo?.tokenPrice?.amount || 0}
              ELF)
            </Button>
          </div>

          {/* Balance Section */}
          <div className="text-white">
            <span className="text-sm">Balance: </span>
            <span className="font-semibold">
              {formatTokenAmount(balanceData?.balance || "", decimal)} ELF
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateForm;
