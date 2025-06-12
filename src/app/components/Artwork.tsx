import { cn } from "@/shadcn/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export default function Artwork({
  artpieceId,
  artpieceName,
  className,
  ...props
}: ArtworkProps) {
  return (
    <Image
      {...props}
      className={cn("shadow-sm", className)}
      src={`/artpiece/${artpieceId}/artwork.jpg`}
      alt={artpieceName}
    />
  );
}

type ArtworkProps = {
  artpieceId: number;
  artpieceName: string;
} & Omit<ComponentProps<typeof Image>, "src" | "alt">;
