import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drag n Drop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex gap-6">
          <div className=" w-80 h-screen p-4 bg-teal-50">
            <h1 className="text-2xl font-bold mb-10 rounded px-2 w-fit text-teal-950">
              drag-n-drop
            </h1>
            <Navigation />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
