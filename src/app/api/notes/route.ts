export const GET = () => {
  const notes = [
    { id: "1", title: "Note 1", content: "Content of Note 1" },
    { id: "2", title: "Note 2", content: "Content of Note 2" },
    { id: "3", title: "Note 3", content: "Content of Note 3" },
  ];
  return new Response(JSON.stringify({ notes }), {
    headers: { "Content-Type": "application/json" },
  });
};
