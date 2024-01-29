"use client"

import Card from "@/components/card";
import { DragEvent, useState } from "react";

const defaultData = [
  {
    id: "1",
    title: "First data ever",
    description: "description disini ya gaes",
    section: "section-1",
    tags: ["tag", "disini"],
  },
  {
    id: "2",
    title: "Data ke 2",
    description: "description disini ya gaes",
    section: "section-2",
    tags: [],
  },
  {
    id: "3",
    title: "Data ke 3",
    description: "description disini ya gaes",
    section: "section-1",
    tags: [],
  },
  {
    id: "4",
    title: "Data ke 4",
    description: "description disini ya gaes",
    section: "section-4",
    tags: [],
  },
]

const defaultSection = [
  {
    id: "sec-1",
    title: "Section 1",
    slug: "section-1"
  },
  {
    id: "sec-2",
    title: "Section 2",
    slug: "section-2"
  },
  {
    id: "sec-3",
    title: "Section 3",
    slug: "section-3"
  },
  {
    id: "sec-4",
    title: "Section 4",
    slug: "section-4"
  },
]

export default function Home() {
  const [data, setData] = useState(defaultData)

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDragStart = (e: DragEvent<HTMLDivElement>, cardId: string) => {
    e.dataTransfer.setData("card", cardId)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>, section: string) => {
    e.preventDefault()
    const cardId = e.dataTransfer.getData("card")
    const cardIndex = data.findIndex(card => card.id === cardId)
    const updateCard = {...data[cardIndex], section}
    const newData = [...data]
    newData[cardIndex] = updateCard
    setData(newData)
  }

  return (
    <main className="py-4 min-w-0">
      <h2 className="font-bold text-4xl mb-8 mx-6">Kanban Board</h2>
      <div className="mx-6 grid grid-cols-[repeat(4,minmax(256px,1fr))] gap-4 py-4">
        {defaultSection.map((section => (
          <div key={section.slug}>
            <p>{section.title}</p>
            <div
              className="py-4 flex flex-col gap-4 h-full"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, section.slug)}
            >
              {data.map(item => {
                if (item.section === section.slug) {
                  return (
                    <Card
                      key={item.id}
                      title={item.title}
                      tags={item.tags}
                      onDragStart={(e) => onDragStart(e, item.id)}
                    />
                  )
                }
              })}
            </div>
          </div>
        )))}
      </div>
    </main>
  );
}
