"use client";

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
  ...imageProps
}: ArtImageProps & Omit<ComponentProps<typeof Image>, "src" | "alt">) {
  const router = useRouter();

  return (
    <Image
      {...imageProps}
      className="border-1 drop-shadow-md transition-transform hover:scale-102"
      onClick={() => router.push(`/art/${artId}`)}
      src={`/${artId}/image.jpg`}
      alt={artName}
    />
  );
}
