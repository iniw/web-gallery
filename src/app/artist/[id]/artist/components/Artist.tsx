import sql from "@/app/lib/sql";
import Image from "next/image";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import React from "react";

export default async function Artist(props: ArtistProps) {
  const [row] = await sql`
    SELECT *
    FROM artist
    WHERE id = ${props.artistId}
  `;

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col items-center">
        <span className="text-center text-2xl font-semibold">{row.name}</span>
        <Image
          className="ring-5"
          src={`/artist/${row.id}/picture.jpg`}
          width={300}
          height={300}
          alt={`${row.name}'s picture`}
        />
      </div>
      <div className="flex min-w-0 gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Info
              className="min-h-min min-w-min"
              color="var(--artpiece-info-icon)"
            />
          </TooltipTrigger>
          <TooltipContent>Information</TooltipContent>
        </Tooltip>
        {row.information ? (
          <span>{row.information}</span>
        ) : (
          <span className="text-muted-foreground">
            No information available
          </span>
        )}
      </div>
    </div>
  );
}

type ArtistProps = {
  artistId: number;
};
