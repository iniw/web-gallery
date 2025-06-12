"use client";

import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import Artwork from "./Artwork";

export default function ArtworkPortal(props: ArtworkPortalProps) {
  const router = useRouter();

  return (
    <Artwork
      {...props}
      onClick={() => router.push(`/artpiece/${props.artpieceId}`)}
    />
  );
}

type ArtworkPortalProps = Omit<ComponentProps<typeof Artwork>, "onClick">;
