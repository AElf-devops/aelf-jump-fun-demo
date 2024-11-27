"use client";
import WebLoginProvider from "@/app/demos/web-login/providers";
import Header from "./components/Header";
import "./index.css";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <WebLoginProvider>
      {/* <div className="bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-600 "> */}
      <Header />
      <div className="mt-24 w-full container m-auto">{children}</div>
      {/* </div> */}
    </WebLoginProvider>
  );
}
