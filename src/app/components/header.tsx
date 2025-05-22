"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 flex items-center gap-8 p-5 outline-2">
      <Link href="/" className="text-3xl font-bold whitespace-nowrap">
        Web Gallery
      </Link>
      <Input className="max-w-100" placeholder="Search" />
    </div>
  );
}
