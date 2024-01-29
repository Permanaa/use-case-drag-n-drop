"use client"

import { DragEvent } from "react";
import Tag from "./tag";

interface ICardProps {
  title: string;
  tags?: string[];
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
}

export default function Card({ title, tags, onDragStart }: ICardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="rounded-lg p-4 bg-main-50 cursor-pointer"
    >
      {!!tags?.length && (
        <div className="mb-2 flex gap-2">
          {tags?.map(tagItem => (
            <Tag key={tagItem}>{tagItem}</Tag>
          ))}
        </div>
      )}
      <p className="font-semibold">{title}</p>
    </div>
  )
}