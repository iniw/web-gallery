import { IconForCategory } from "@/app/components/IconForCategory";
import InfoEntry from "@/app/components/InfoEntry";
import { User } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import {
  Calendar,
  CircleHelp,
  Dna,
  Languages,
  List,
  User as UserIcon,
} from "lucide-react";
import React from "react";

export default async function Info(props: InfoProps) {
  const [row] = await sql`
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
      JSONB_AGG(DISTINCT secondary_genre.name) FILTER (WHERE secondary_genre.id IS NOT NULL) as secondary_genres,
      JSONB_AGG(DISTINCT artpiece_language.name) FILTER (WHERE artpiece_language.id IS NOT NULL) as languages,
      JSONB_AGG(DISTINCT artpiece_keyword.name) FILTER (WHERE artpiece_keyword.id IS NOT NULL) as keywords

    FROM artpiece

    LEFT JOIN artist_artpiece ON artist_artpiece.artpiece_id = artpiece.id
    LEFT JOIN artist ON artist.id = artist_artpiece.artist_id

    LEFT JOIN artpiece_genre ON artpiece_genre.artpiece_id = artpiece.id
    LEFT JOIN genre ON genre.id = artpiece_genre.genre_id

    LEFT JOIN artpiece_secondary_genre ON artpiece_secondary_genre.artpiece_id = artpiece.id
    LEFT JOIN genre secondary_genre ON secondary_genre.id = artpiece_secondary_genre.genre_id

    LEFT JOIN artpiece_artpiece_language ON artpiece_artpiece_language.artpiece_id = artpiece.id
    LEFT JOIN artpiece_language ON artpiece_language.id = artpiece_artpiece_language.artpiece_language_id

    LEFT JOIN artpiece_artpiece_keyword ON artpiece_artpiece_keyword.artpiece_id = artpiece.id
    LEFT JOIN artpiece_keyword ON artpiece_keyword.id = artpiece_artpiece_keyword.artpiece_keyword_id

    WHERE artpiece.id = ${props.artpieceId}

    GROUP BY artpiece.id
  `;

  const entries = [
    {
      icon: <IconForCategory categoryId={row.category_id} />,
      content: row.name,
      tooltip: "Name",
    },
    {
      icon: <UserIcon />,
      content: row.artists.map((artist: any) => ({
        content: artist.name,
        href: `/artist/${artist.id}`,
      })),
      tooltip: "Artist",
    },
    {
      icon: <Calendar />,
      content: row.date.toLocaleDateString(navigator.languages[0], {
        year: "numeric",
        month: "2-digit",
      }),
      tooltip: "Date",
    },
    {
      icon: <Languages />,
      content: row.languages,
      tooltip: "Languages",
    },
    {
      icon: <CircleHelp />,
      content: row.type,
      tooltip: "Type",
    },
    {
      icon: <Dna />,
      content: (
        <div className="flex flex-col">
          <InfoEntry content={row.genres} />
          {row.secondary_genres && (
            <InfoEntry
              content={row.secondary_genres}
              className="text-lg text-muted-foreground"
            />
          )}
        </div>
      ),
      tooltip: "Genres",
    },
    {
      icon: <List />,
      content: row.keywords,
      tooltip: "Keywords",
    },
  ];

  console.log(row.genres, row.secondary_genres);

  return (
    <>
      <div className="flex flex-col gap-2 text-xl">
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
    </>
  );
}

type InfoProps = {
  artpieceId: number;
  user?: User;
};
