import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcn/components/hover-card";
import { User } from "lucide-react";
import React from "react";
import ArtworkPortal from "./components/ArtworkPortal";
import Card from "./components/Card";
import { IconForCategory } from "./components/IconForCategory";
import sql from "./lib/sql";

export default async function Page() {
  const rows = await sql`
    SELECT
      category.*,
      JSONB_AGG(
        JSONB_BUILD_OBJECT(
          'id', artpiece.id,
          'name', artpiece.name,
          'artist', artist.name,
          'date', artpiece.date
        )
        ORDER BY artpiece.id
      ) AS artpieces

    FROM category

    JOIN artpiece ON artpiece.category_id = category.id

    LEFT JOIN artist_artpiece ON artist_artpiece.artpiece_id = artpiece.id
    LEFT JOIN artist ON artist.id = artist_artpiece.artist_id

    GROUP BY category.id
  `;

  return (
    <div className="flex flex-col gap-10">
      {rows.map((category: any) => (
        <Card title={category.name} key={category.id}>
          <div className="flex gap-3">
            {category.artpieces.map((artpiece: any) => (
              <HoverCard openDelay={0} closeDelay={0} key={artpiece.id}>
                <HoverCardTrigger asChild>
                  <ArtworkPortal
                    key={artpiece.id}
                    className="transition-[scale] duration-200 hover:scale-102"
                    artpieceId={artpiece.id}
                    artpieceName={artpiece.name}
                    width={250}
                    height={250}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto max-w-100">
                  <ArtpieceInfoHover
                    categoryId={category.id}
                    artpiece={artpiece}
                  />
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ArtpieceInfoHover(props: ArtpieceInfoHoverProps) {
  const entries = [
    {
      icon: <IconForCategory categoryId={props.categoryId} />,
      text: props.artpiece.name,
    },
    {
      icon: <User />,
      text: props.artpiece.artist,
    },
  ];

  return (
    <div className="flex flex-col gap-2 text-2xl">
      {entries.map((entry, i) => (
        <p key={i} className="flex min-w-0 items-center gap-2">
          {React.cloneElement(entry.icon, {
            color: "var(--artpiece-info-icon)",
          })}
          {entry.text && (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {entry.text}
            </span>
          )}
        </p>
      ))}
    </div>
  );
}

type ArtpieceInfoHoverProps = {
  categoryId: number;
  artpiece: {
    id: number;
    name: string;
    artist?: string;
    date: Date;
  };
};
