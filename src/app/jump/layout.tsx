import WebLoginProvider from "@/app/demos/web-login/providers";
import Header from "./components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AelfdRegistry } from "@aelf-design/nextjs-registry";
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
          <Header />
          <div className="mt-24 w-full container m-auto">{children}</div>
        </WebLoginProvider>
      </AelfdRegistry>
    </AntdRegistry>
  );
}
