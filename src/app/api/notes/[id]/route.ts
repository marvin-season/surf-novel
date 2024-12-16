export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  if (!id) {
    return new Response(JSON.stringify({ message: "笔记不存在" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ id, message: "笔记更新成功" }), {
    headers: { "Content-Type": "application/json" },
  });
};
