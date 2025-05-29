import ArtPieceImage from "./components/ArtPieceImage";
import Card from "./components/Card";
import sql from "./lib/sql";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "lucide-react";
import { IconForCategory } from "./components/IconForCategory";

export default async function Page() {
  const rows = await sql`
    SELECT c.id as category_id,
      c.name as category_name,
      a.id as art_id,
      a.name as art_name,
      a.artist as art_artist,
      a.date as art_date
    FROM category c,
    LATERAL (
      SELECT *
      FROM artpiece
      WHERE artpiece.category_id = c.id
      LIMIT 20
    ) a
`;

  const artByCategory: ArtByCategory = {};
  for (const row of rows) {
    if (!artByCategory[row.category_id])
      artByCategory[row.category_id] = {
        name: row.category_name,
        arts: [],
      };

    artByCategory[row.category_id].arts.push({
      id: row.art_id,
      name: row.art_name,
      artist: row.art_artist,
      date: row.art_date,
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(artByCategory).map(([categoryId, category]) => (
        <Card title={category.name} key={categoryId}>
          <div className="flex gap-3">
            {category.arts.map((art) => (
              <HoverCard key={art.id}>
                <HoverCardTrigger asChild>
                  <ArtPieceImage
                    key={art.id}
                    artId={art.id}
                    artName={art.name}
                    width={250}
                    height={250}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto max-w-100">
                  <HoverContent categoryId={Number(categoryId)} art={art} />
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

type ArtByCategory = {
  [id: number]: {
    name: string;
    arts: {
      id: number;
      name: string;
      artist: string;
      date: Date;
    }[];
  };
};

function HoverContent(props: HoverContentProps) {
  const entries = [
    {
      icon: (
        <IconForCategory
          categoryId={Number(props.categoryId)}
          color="var(--artpiece-info-icon)"
        />
      ),
      text: props.art.name,
    },
    {
      icon: <User color="var(--artpiece-info-icon)" />,
      text: props.art.artist,
    },
  ];
  return (
    <div className={"flex flex-col gap-2 text-2xl"}>
      {entries.map((entry, i) => (
        <p key={i} className="flex min-w-0 items-center gap-2">
          {entry.icon}
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
  art: {
    id: number;
    name: string;
    artist: string;
    date: Date;
  };
};
