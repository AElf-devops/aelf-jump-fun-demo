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
              },
              components: {
                Table: {
                  headerBg: "#0e3068",
                  headerColor: "#FFFFFF",
                  rowHoverBg: "#21243A",
                  borderColor: "#272A3A",
                  colorBgContainer: "#0e3068",
                  colorText: "#FFFFFF",
                  headerSplitColor: "#272A3A",
                },
                Button: {
                  defaultColor: "#FFFFFF",
                  defaultBg: "#0f4984",
                },
              },
            }}
          >
            <Header />
            <div className="w-full page-container m-auto">{children}</div>
          </ConfigProvider>
        </WebLoginProvider>
      </AelfdRegistry>
    </AntdRegistry>
  );
}
