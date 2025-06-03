"use client";

import { cn } from "@/shadcn/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

export default function ArtPieceImage({
  artpieceId,
  artpieceName,
  className,
  ...imageProps
}: ArtPieceImageProps & Omit<ComponentProps<typeof Image>, "src" | "alt">) {
  const router = useRouter();

  return (
    <Image
      {...imageProps}
      className={cn("drop-shadow-md", className)}
      onClick={() => router.push(`/artpiece/${artpieceId}`)}
      src={`/artpiece/${artpieceId}/artwork.jpg`}
      alt={artpieceName}
    />
  );
}

interface ArtPieceImageProps {
  artpieceId: number;
  artpieceName: string;
}
