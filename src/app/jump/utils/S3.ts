import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { useCallback, useMemo } from "react";

export function useAWSUploadService() {
  const info = {
    identityPoolID: "ap-northeast-1:f90eaaa6-a934-478d-9b90-a868fa8e4816",
    bucket: "forest-testnet",
  };

  const REGION = "ap-northeast-1";

  const s3Client = useMemo(
    () =>
      new S3Client({
        region: REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({
            region: REGION,
          }),
          identityPoolId: info.identityPoolID || "",
        }),
      }),
    [info.identityPoolID]
  );

  const awsUploadFile = useCallback(
    async (file: File) => {
      const FileKey = `${Date.now()}-${file.name}`;
      const params = {
        ACL: "public-read",
        Bucket: info.bucket,
        Key: FileKey,
      };
      try {
        const res = await s3Client.send(
          new PutObjectCommand({
            Body: file,
            ContentType: file.type,
            ContentLength: file.size,
            ...params,
          } as PutObjectCommandInput)
        );
        console.log("=====uploadFile success:", res);
        return `https://${info.bucket}.s3.${REGION}.amazonaws.com/${encodeURIComponent(FileKey)}`;
      } catch (error) {
        console.error("=====awsUploadFile error:", error);
        return Promise.reject(error);
      }
    },
    [s3Client, info.bucket]
  );

  return {
    awsUploadFile,
  };
}
