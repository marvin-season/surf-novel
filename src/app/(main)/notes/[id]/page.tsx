export default async function Note({ params }: { params: Promise<string> }) {
  console.log("props", await params);
  return <>hi</>;
}
