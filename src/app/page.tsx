"use client"

import Button from "@/components/button";
import Card from "@/components/kanban-card";
import { useLocalStorageState } from "@/hooks/useLocalStorage";
import { XMark } from "@/icons/x-mark";
import { DragEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const section = [
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "inprogress",
    title: "In Progress",
  },
  {
    id: "done",
    title: "Done",
  },
]

interface IFormCreate {
  title: { value: string };
  description: { value: string };
  tags: { value: string };
}

interface ICardData {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  section: string;
}

export default function Home() {
  const [data, setData] = useLocalStorageState<ICardData[]>("kanban-data", [])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isLoading, setIsloading] = useState<boolean>(true)

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, tags } = e.currentTarget as typeof e.currentTarget & IFormCreate
    const splitTags = !!tags?.value ? tags?.value?.split(",") : []
    const newCard = {
      id: uuidv4(),
      title: title?.value || "",
      description: description?.value || "",
      tags: splitTags,
      section: "todo",
    }
    setData(prev => ([...prev, newCard]))
    setIsOpenModal(false)
    e.currentTarget.reset()
  }

  const onDelete = (id: string) => {
    const newData = data.filter(item => item.id !== id)
    setData(newData)
  }

  useEffect(() => {
    setIsloading(false)
  }, [])

  return (
    <main className="py-4 min-w-0">
      <div className="flex justify-between mx-6">
        <h2 className="font-bold text-4xl mb-8">Kanban Board</h2>
        <Button onClick={() => setIsOpenModal(true)}>Create</Button>
      </div>

      <div className="mx-6 grid grid-cols-[repeat(3,minmax(256px,1fr))] gap-4 py-4">
        {section.map((section => (
          <div
            key={section.id}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, section.id)}
          >
            <p className="font-semibold border-b border-main-500 pb-4">{section.title}</p>
            <div className="py-4 flex flex-col gap-4 h-full">
              {!isLoading && data?.map(item => {
                if (item.section === section.id) {
                  return (
                    <Card
                      key={item.id}
                      title={item.title}
                      tags={item.tags}
                      description={item.description}
                      onDragStart={(e) => onDragStart(e, item.id)}
                      onDelete={() => onDelete(item.id)}
                    />
                  )
                }
              })}
            </div>
          </div>
        )))}
      </div>

      {!isLoading && !data?.length && (
        <div className="flex flex-col justify-center items-center gap-6 h-56 my-6">
          <h5 className="text-4xl font-bold">👻 Empty</h5>
          <Button onClick={() => setIsOpenModal(true)}>{"Let's create one"}</Button>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col justify-center items-center gap-6 h-56 my-6">
          <p className="text-xl font-medium">🏃‍♂️ Loading...</p>
        </div>
      )}

      <div tabIndex={-1} className={`${isOpenModal ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur`}>
        <div className="bg-main-50 rounded-xl p-4 relative min-w-96">
          <div className="flex justify-between mb-4">
            <h5 className="text-xl">Create Card</h5>
            <button onClick={() => setIsOpenModal(false)}>
              <XMark />
            </button>
          </div>
          <div>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="title" className="mb-2">Title<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border border-main-200 rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="border border-main-200 rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5"
                ></textarea>
              </div>
              <div>
                <label htmlFor="tags" className="mb-2">Tags <span className="text-sm">(separate with commas)</span></label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="border border-main-200 rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5"
                  placeholder="e.g. priority,medium"
                />
              </div>
              <Button type="submit" className="self-end">Create</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
