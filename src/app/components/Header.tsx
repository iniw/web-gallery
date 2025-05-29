"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="col-span-full row-[1/_span_2] h-screen" />
      <header className="sticky top-0 z-1000 col-start-1 row-start-1 flex items-center gap-8 border-b-2 bg-inherit p-5">
        <Link href="/" className="text-3xl font-bold">
          Web Gallery
        </Link>
        <Input className="max-w-100" placeholder="Search" />
      </header>
    </>
  );
}
