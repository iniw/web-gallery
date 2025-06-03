import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcn/components/hover-card";
import { User } from "lucide-react";
import React from "react";
import ArtPieceImage from "./components/ArtPieceImage";
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
          'artist', artpiece.artist,
          'date', artpiece.date
        )
        ORDER BY artpiece.id
      ) AS artpieces
    FROM category
    JOIN artpiece ON artpiece.category_id = category.id
    GROUP BY category.id
  `;

  return (
    <div className="flex flex-col gap-10">
      {rows.map((category: any) => (
        <Card title={category.name} key={category.id}>
          <div className="flex gap-3">
            {category.artpieces.map((artpiece: any) => (
              <HoverCard key={artpiece.id}>
                <HoverCardTrigger asChild>
                  <ArtPieceImage
                    key={artpiece.id}
                    artpieceId={artpiece.id}
                    artpieceName={artpiece.name}
                    width={250}
                    height={250}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto max-w-100">
                  <ArtworkHover categoryId={category.id} artpiece={artpiece} />
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ArtworkHover(props: HoverContentProps) {
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
    <div className={"flex flex-col gap-2 text-2xl"}>
      {entries.map((entry, i) => (
        <p key={i} className="flex min-w-0 items-center gap-2">
          {React.cloneElement(entry.icon, {
            color: "var(--artpiece-info-icon)",
          })}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {entry.text}
          </span>
        </p>
      ))}
    </div>
  );
}

type HoverContentProps = {
  categoryId: number;
  artpiece: {
    id: number;
    name: string;
    artist: string;
    date: Date;
  };
};
