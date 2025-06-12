import Card from "@/app/components/Card";
import sql from "@/app/lib/sql";
import Artwork from "@/app/components/Artwork";
import InfoEntry from "@/app/components/InfoEntry";
import { IconForCategory } from "@/app/components/IconForCategory";
import {
  Calendar,
  CircleHelp,
  Dna,
  Languages,
  User as UserIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // TODO: Check type of the route param
  const { query } = await searchParams;

  const rows = await sql`
    SELECT
      artpiece.*,
      JSONB_AGG(
        DISTINCT
        JSONB_BUILD_OBJECT(
          'id', artist.id,
          'name', artist.name
        )
      ) AS artists,
      JSONB_AGG(DISTINCT genre.name) FILTER (WHERE genre.id IS NOT NULL) as genres,
      JSONB_AGG(DISTINCT secondary_genre.name) FILTER (WHERE secondary_genre.id IS NOT NULL) as secondary_genres

    FROM artpiece

    LEFT JOIN artist_artpiece ON artist_artpiece.artpiece_id = artpiece.id
    LEFT JOIN artist ON artist.id = artist_artpiece.artist_id

    LEFT JOIN artpiece_genre ON artpiece_genre.artpiece_id = artpiece.id
    LEFT JOIN genre ON genre.id = artpiece_genre.genre_id

    LEFT JOIN artpiece_secondary_genre ON artpiece_secondary_genre.artpiece_id = artpiece.id
    LEFT JOIN genre secondary_genre ON secondary_genre.id = artpiece_secondary_genre.genre_id

    WHERE STRPOS(LOWER(artpiece.name), LOWER(${query})) > 0

    GROUP BY artpiece.id
  `;

  return (
    <div className="h-full w-full">
      <Card title="Results">
        <div className="flex flex-col gap-2">
          {rows.map((artpiece: any) => {
            const entries = [
              {
                icon: <IconForCategory categoryId={artpiece.category_id} />,
                content: {
                  content: artpiece.name,
                  href: `/artpiece/${artpiece.id}`,
                },
                tooltip: "Name",
              },
              {
                icon: <UserIcon />,
                content: artpiece.artists.map((artist: any) => ({
                  content: artist.name,
                  href: `/artist/${artist.id}`,
                })),
                tooltip: "Artist",
              },
              {
                icon: <Calendar />,
                content: artpiece.date.toLocaleDateString(
                  navigator.languages[0],
                  {
                    year: "numeric",
                    month: "2-digit",
                  },
                ),
                tooltip: "Date",
              },
              {
                icon: <Languages />,
                content: artpiece.languages,
                tooltip: "Languages",
              },
              {
                icon: <CircleHelp />,
                content: artpiece.type,
                tooltip: "Type",
              },
              {
                icon: <Dna />,
                content: (
                  <div className="flex flex-col">
                    <InfoEntry content={artpiece.genres} />
                    {artpiece.secondary_genres && (
                      <InfoEntry
                        content={artpiece.secondary_genres}
                        className="text-lg text-muted-foreground"
                      />
                    )}
                  </div>
                ),
                tooltip: "Genres",
              },
            ];

            return (
              <div
                key={artpiece.id}
                className="flex gap-2 rounded-lg border p-2"
              >
                <Artwork
                  artpieceId={artpiece.id}
                  artpieceName={artpiece.name}
                  height={250}
                  width={250}
                />
                <div className="flex flex-col gap-1 text-lg">
                  {entries.map((entry, i) => (
                    <div key={i} className="flex min-w-0 items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {React.cloneElement(entry.icon, {
                            className: "min-h-min min-w-min",
                            color: "var(--artpiece-info-icon)",
                          })}
                        </TooltipTrigger>
                        <TooltipContent>{entry.tooltip}</TooltipContent>
                      </Tooltip>
                      <InfoEntry content={entry.content} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
