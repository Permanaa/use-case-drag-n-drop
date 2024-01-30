"use client"

import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={"rounded-lg px-4 py-2 text-main-50 bg-gradient-to-br from-main-500 to-main-400 h-fit w-fit " + props.className}
    >
      {props.children}
    </button>
  )
}