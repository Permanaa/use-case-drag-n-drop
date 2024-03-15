"use client"

import Link from "next/link";
import StackIcon from "@/icons/stack";
import Stack3DIcon from "@/icons/stack-3d";
import { usePathname } from "next/navigation";
import DocumentArrowUp from "@/icons/document-arrow-up";
import ArrowDownOnSquare from "@/icons/arrow-down-on-square";

const menu = [
  {
    title: "Kanban Board",
    slug: "/",
    icon: StackIcon,
  },
  {
    title: "Sortable List",
    slug: "/sortable-list",
    icon: Stack3DIcon
  },
  {
    title: "File",
    slug: "/file",
    icon: DocumentArrowUp,
  },
  {
    title: "Multi-Select",
    slug: "/multi-select",
    icon: ArrowDownOnSquare,
  }
]

export default function Navigation() {
  const pathname = usePathname()
  return (
    <ul className="flex flex-col gap-2">
      {menu.map(item => {
        const isActive = item.slug === pathname
        return (
          <li key={item.slug}>
            <Link href={item.slug} className={`flex gap-2 px-4 py-3 rounded-lg font-semibold ${isActive ? "bg-main-500 text-main-50 hover:bg-main-400" : "text-main-950 hover:bg-main-100"}`}>
              <item.icon className="w-6" />
              <p>{item.title}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}