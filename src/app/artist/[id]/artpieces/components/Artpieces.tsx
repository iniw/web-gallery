import Artwork from "@/app/components/Artwork";
import { IconForCategory } from "@/app/components/IconForCategory";
import InfoEntry from "@/app/components/InfoEntry";
import sql from "@/app/lib/sql";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import { Calendar, CircleHelp, Dna } from "lucide-react";
import React from "react";

export default async function Artpieces(props: ArtpiecesProps) {
  const [row] = await sql`
    SELECT
      artist.*,
      JSONB_AGG(
        JSONB_BUILD_OBJECT(
          'id', artpiece.id,
          'category_id', artpiece.category_id,
          'name', artpiece.name,
          'date', artpiece.date,
          'type', artpiece.type,
          'genres', genres,
          'secondary_genres', secondary_genres
        )
        ORDER BY artpiece.date
      ) AS artpieces

    FROM artist

    JOIN artist_artpiece ON artist_artpiece.artist_id = artist.id
    JOIN artpiece ON artpiece.id = artist_artpiece.artpiece_id

    LEFT JOIN LATERAL (
      SELECT JSONB_AGG(DISTINCT genre.name) as genres
      FROM artpiece_genre
      JOIN genre ON genre.id = artpiece_genre.genre_id
      WHERE artpiece_genre.artpiece_id = artpiece.id
    ) AS genres ON true

    LEFT JOIN LATERAL (
      SELECT JSONB_AGG(DISTINCT genre.name) as secondary_genres
      FROM artpiece_secondary_genre
      JOIN genre ON genre.id = artpiece_secondary_genre.genre_id
      WHERE artpiece_secondary_genre.artpiece_id = artpiece.id
    ) AS secondary_genres ON true

    WHERE artist.id = ${props.artistId}

    GROUP BY artist.id
  `;

  return (
    <>
      {row.artpieces.map((artpiece: any) => {
        console.log(artpiece.genres);

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
            icon: <Calendar />,
            content: new Date(artpiece.date).toLocaleDateString(
              navigator.languages[0],
              {
                year: "numeric",
                month: "2-digit",
              },
            ),
            tooltip: "Date",
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
          <div key={artpiece.id} className="flex gap-2 rounded-lg border p-2">
            <Artwork
              artpieceId={artpiece.id}
              artpieceName={artpiece.name}
              height={200}
              width={200}
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
    </>
  );
}

type ArtpiecesProps = {
  artistId: number;
};
