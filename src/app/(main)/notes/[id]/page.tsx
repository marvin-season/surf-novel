import NoteEditorContainer from "@/components/notes/note-editor-container";
import { getNote } from "@/app/(main)/notes/actions";

// 预渲染页面 暂时无法实现 SSG 静态预选染
// export async function generateStaticParams() {
//   const notes = await getNotes();
//   // pre generate 10 page
//   return notes.slice(0, 10).map((note) => ({
//     id: `${note.id}`,
//   }));
// }

export default async function Note({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = (await getNote(id).catch(console.log)) || undefined;
  return (
    <>
      <NoteEditorContainer note={note} />
    </>
  );
}

// ISR Configuration
// Revalidate the page every 10 seconds
// export const revalidate = 10

/** dynamicParams
 * true (default): Dynamic segments not included in generateStaticParams are generated on demand.
 * false: Dynamic segments not included in generateStaticParams will return a 404.
 */

// export const dynamicParams = true
