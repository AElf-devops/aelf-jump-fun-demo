import Token from "@/app/jump/pageComponents/token";
import { useRouter } from "next/router";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <Token id={id} />;
}

export const dynamic = "force-dynamic";
