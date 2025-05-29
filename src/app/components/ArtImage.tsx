"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

export default function ArtPieceImage({
  artId,
  artName,
  className,
  ...imageProps
}: ArtPieceImageProps & Omit<ComponentProps<typeof Image>, "src" | "alt">) {
  const router = useRouter();

  return (
    <Image
      {...imageProps}
      className={cn("drop-shadow-md", className)}
      onClick={() => router.push(`/artpiece/${artId}`)}
      src={`/${artId}/image.jpg`}
      alt={artName}
    />
  );
}

interface ArtPieceImageProps {
  artId: number;
  artName: string;
}
