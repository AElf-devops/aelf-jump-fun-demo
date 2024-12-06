// import WebLoginProvider from "@/app/demos/web-login/providers";
import dynamic from "next/dynamic";
const WebLoginProvider = dynamic(
  () => import("@/app/demos/web-login/providers"),
  {
    ssr: false,
  }
);
import Header from "./components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AelfdRegistry } from "@aelf-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./index.css";
import { FormDataProvider } from "./context/FormDataContext";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdRegistry>
      <AelfdRegistry>
        <WebLoginProvider>
          <ConfigProvider
            theme={{
              token: {
                colorTextDisabled: "#FFFFFF",
                colorBgContainerDisabled: "#0e3068",
                fontFamily: "inherit",
              },
              components: {
                Table: {
                  // headerBg: "transparent",
                  headerColor: "#FFFFFF",
                  borderColor: "#22252DBF",
                  colorBgContainer: "transparent",
                  colorText: "#FFFFFF",
                  headerSplitColor: "#22252DBF",
                },
                Button: {
                  defaultColor: "#FFFFFF",
                  defaultHoverColor: "#FFFFFF",
                  defaultBg: "#0f4984",
                  defaultBorderColor: "transparent",
                  defaultHoverBorderColor: "transparent",
                  defaultActiveColor: "transaprent",
                },
              },
            }}
          >
            <Header />
            <div className="w-full page-container mx-auto">
              <FormDataProvider>{children}</FormDataProvider>
            </div>
          </ConfigProvider>
        </WebLoginProvider>
      </AelfdRegistry>
    </AntdRegistry>
  );
}
