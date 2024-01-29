import { ReactNode } from "react"

export interface ITagProps {
  children: ReactNode
}

export default function Tag({ children }: ITagProps) {
  return (
    <div className="px-3 rounded-full bg-main-500 text-main-50">
      {children}
    </div>
  )
}