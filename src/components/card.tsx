"use client"

import { HTMLAttributes } from "react";
import Tag from "./tag";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tags?: string[];
}

export default function Card({ title, description, tags, onDragStart, className }: ICardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={"rounded-lg p-4 bg-main-50 cursor-pointer " + className}
    >
      {!!tags?.length && (
        <div className="mb-2 flex gap-2">
          {tags?.map(tagItem => (
            <Tag key={tagItem}>{tagItem}</Tag>
          ))}
        </div>
      )}
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}