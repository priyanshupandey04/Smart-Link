import FetchParam from "./FetchParam";

export default async function Page({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;

  return <FetchParam shortId={shortId} />;
}
