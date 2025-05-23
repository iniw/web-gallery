"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

interface ArtImageProps {
  artId: number;
  artName: string;
}

export default function ArtImage({
  artId,
  artName,
  className,
  ...imageProps
}: ArtImageProps & Omit<ComponentProps<typeof Image>, "src" | "alt">) {
  const router = useRouter();

  return (
    <Image
      {...imageProps}
      className={cn("drop-shadow-md", className)}
      onClick={() => router.push(`/art/${artId}`)}
      src={`/${artId}/image.jpg`}
      alt={artName}
    />
  );
}
