import { getNotes } from "../actions";
import dynamic from "next/dynamic";
const NoteEditorContrainer = dynamic(
  () => import("@/components/notes/note-editor-container"),
);

// Fetch the static parameters 预渲染页面
export async function generateStaticParams() {
  const notes = await getNotes();
  // pre generate 10 page
  return notes.slice(0, 10).map((note) => ({
    id: `${note.id}`,
  }));
}

export default async function Note({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log("props", params);
  return (
    <>
      <NoteEditorContrainer />
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
