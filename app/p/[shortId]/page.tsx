import Main from "./Main";

export default async function Page({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;

  return <Main shortId={shortId} />;
}
