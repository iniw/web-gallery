import { IconForCategory } from "@/app/components/IconForCategory";
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
    artpiece_type.name as type,
    STRING_AGG(DISTINCT genre.name, ', ') as genres,
    STRING_AGG(DISTINCT secondary_genre.name, ', ') as secondary_genres,
    STRING_AGG(DISTINCT artpiece_language.name, ', ') as languages,
    STRING_AGG(DISTINCT artpiece_keyword.name, ', ') as keywords

  FROM artpiece

  LEFT JOIN artpiece_genre ON artpiece_genre.artpiece_id = artpiece.id
  LEFT JOIN genre ON genre.id = artpiece_genre.genre_id

  LEFT JOIN artpiece_secondary_genre ON artpiece_secondary_genre.artpiece_id = artpiece.id
  LEFT JOIN genre secondary_genre ON secondary_genre.id = artpiece_secondary_genre.genre_id

  LEFT JOIN artpiece_artpiece_language ON artpiece_artpiece_language.artpiece_id = artpiece.id
  LEFT JOIN artpiece_language ON artpiece_language.id = artpiece_artpiece_language.artpiece_language_id

  LEFT JOIN artpiece_artpiece_type ON artpiece_artpiece_type.artpiece_id = artpiece.id
  LEFT JOIN artpiece_type ON artpiece_type.id = artpiece_artpiece_type.artpiece_type_id

  LEFT JOIN artpiece_artpiece_keyword ON artpiece_artpiece_keyword.artpiece_id = artpiece.id
  LEFT JOIN artpiece_keyword ON artpiece_keyword.id = artpiece_artpiece_keyword.artpiece_keyword_id

  WHERE artpiece.id = ${props.artpieceId}

  GROUP BY artpiece.id, artpiece_type.name
`;

  const entries = [
    {
      icon: <IconForCategory categoryId={row.category_id} />,
      content: row.name,
      tooltip: "Name",
    },
    {
      icon: <UserIcon />,
      content: row.artist,
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
          {row.secondary_genres && row.secondary_genres.length > 0 && (
            <div className="text-lg text-wrap text-muted-foreground">
              {row.secondary_genres}
            </div>
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
            {React.isValidElement(entry.content) ? (
              entry.content
            ) : (
              <InfoEntry content={entry.content} />
            )}
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

function InfoEntry({ content }: { content: string }) {
  return (
    <div className="text-wrap">
      {content || <span className="text-muted-foreground">Unknown</span>}
    </div>
  );
}
