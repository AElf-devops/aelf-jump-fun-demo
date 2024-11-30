import WebLoginProvider from "@/app/demos/web-login/providers";
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
                colorTextDisabled: "#272A3A",
                colorBgContainerDisabled: "#A0C4FF",
              },
              components: {
                Table: {
                  headerBg: "#1B1D2A",
                  headerColor: "#FFFFFF",
                  rowHoverBg: "#21243A",
                  borderColor: "#272A3A",
                  colorBgContainer: "#1B1D2A",
                  colorText: "#FFFFFF",
                  headerSplitColor: "#272A3A",
                },
                Button: {
                  defaultColor: "#FFFFFF",
                  defaultBg: "#1E90FF",
                },
              },
            }}
          >
            <Header />
            <div className="mt-24 w-full page-container m-auto">{children}</div>
          </ConfigProvider>
        </WebLoginProvider>
      </AelfdRegistry>
    </AntdRegistry>
  );
}
