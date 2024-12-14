import { MainLayout } from "@/components/layout/main-layout"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { RichEditor } from "@/components/editor/rich-editor"

const sidebarNavItems = [
  {
    title: "我的笔记",
    href: "/notes",
  },
  {
    title: "最近编辑",
    href: "/recent",
  },
  {
    title: "收藏夹",
    href: "/favorites",
  },
]

export default function Home() {
  return (
    <MainLayout
      sidebar={
        <div className="space-y-6 py-4 px-2">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Surf Novel</h2>
            <SidebarNav items={sidebarNavItems} />
          </div>
        </div>
      }
    >
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">开始写作</h2>
        </div>
        <div className="h-full">
          {/* <RichEditor /> */}
        </div>
      </div>
    </MainLayout>
  )
}
