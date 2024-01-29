"use client"

import Link from "next/link";
import StackIcon from "@/icons/stack";
import Stack3DIcon from "@/icons/stack-3d";
import { usePathname } from "next/navigation";

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
            <Link href={item.slug} className={`flex gap-2 px-4 py-3 rounded-lg font-semibold ${isActive ? "bg-teal-500 text-teal-50" : "text-teal-950"}`}>
              <item.icon className="w-6" />
              <p>{item.title}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}