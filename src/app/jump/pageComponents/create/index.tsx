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
import { useFormData } from "../../context/FormDataContext";
import { useBalance, useDecimal } from "../../hook/balance";

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
  const { balanceData } = useBalance({
    callViewMethod,
    walletInfo,
    loadingSetter: setLoading,
  });

  const { decimal } = useDecimal({
    callViewMethod,
    walletInfo,
  });

  // token name
  const [tokenName, setTokenName] = useState<string>("");
  const handleTokenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTokenName(inputValue.trim());
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
        "The maximum length of token symbol supported is 10. Please search for a shorter symbol, all in uppercase letters."
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

  const { TextArea } = Input;
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    setDescription(inputValue.trim());
  };

  const [links, setLinks] = useState({
    website: "",
    telegram: "",
    x: "",
    youtube: "",
  });

  const handleLinkChange = (key: string, value: string) => {
    setLinks(prevLinks => ({
      ...prevLinks,
      [key]: value.trim(),
    }));
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
  const { setFormData } = useFormData();
  const createToken = async () => {
    const amount = symbolInfo.tokenPrice.amount;
    setFormData({
      amount,
      tokenName,
      uploadUrl,
      decimal,
      symbol,
      desc: description,
      socialMedia: Object.values(links),
    });
    router.push("/jump/confirm");
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
          <Form.Item
            label={
              <label className="block text-sm font-semibold text-white mb-2">
                Description
              </label>
            }
          >
            <TextArea
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Item>
          {/* Website Link */}
          <Form.Item
            label={
              <label className="block text-sm font-semibold text-white mb-2">
                Website Link
              </label>
            }
          >
            <Input
              type="text"
              value={links.website}
              placeholder="optional"
              onChange={e => handleLinkChange("website", e.target.value)}
            />
          </Form.Item>

          {/* Telegram Link */}
          <Form.Item
            label={
              <label className="block text-sm font-semibold text-white mb-2">
                Telegram Link
              </label>
            }
          >
            <Input
              type="text"
              value={links.telegram}
              placeholder="optional"
              onChange={e => handleLinkChange("telegram", e.target.value)}
            />
          </Form.Item>

          {/* X Link */}
          <Form.Item
            label={
              <label className="block text-sm font-semibold text-white mb-2">
                X Link
              </label>
            }
          >
            <Input
              type="text"
              value={links.x}
              placeholder="optional"
              onChange={e => handleLinkChange("x", e.target.value)}
            />
          </Form.Item>

          {/* YouTube Link */}
          <Form.Item
            label={
              <label className="block text-sm font-semibold text-white mb-2">
                YouTube Link
              </label>
            }
          >
            <Input
              type="text"
              value={links.youtube}
              placeholder="optional"
              onChange={e => handleLinkChange("youtube", e.target.value)}
            />
          </Form.Item>
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
              {formatTokenAmount(balanceData?.balance || "", decimal)}{" "}
              {balanceData?.symbol}
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateForm;
