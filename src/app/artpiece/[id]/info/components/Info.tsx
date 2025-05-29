import { User as AppUser } from "@/app/lib/dal";
import sql from "@/app/lib/sql";
import { IconForCategory } from "@/app/components/IconForCategory";
import { Calendar, Dna, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Info(props: InfoProps) {
  const rows = await sql`
    SELECT
      artpiece.*,
      genre.name as genre,
      secondary_genre.name as secondary_genre
    FROM artpiece
    LEFT JOIN artpiece_genre ON artpiece_genre.artpiece_id = ${props.artpieceId}
    LEFT JOIN artpiece_secondary_genre ON artpiece_secondary_genre.artpiece_id = ${props.artpieceId}
    LEFT JOIN genre ON genre.id = artpiece_genre.genre_id
    LEFT JOIN genre secondary_genre ON secondary_genre.id = artpiece_secondary_genre.genre_id
    WHERE artpiece.id = ${props.artpieceId}
  `;

  const [row] = rows;

  // FIXME: Figure out how to get rid of this ridiculousness.
  const genres = [...new Set(rows.map((row: any) => row.genre))];
  const secondary_genres = [
    ...new Set(rows.map((row: any) => row.secondary_genre)),
  ];

  const has_multiple_genres = genres.length + secondary_genres.length > 1;

  const entries = [
    {
      icon: (
        <IconForCategory
          className="min-h-min min-w-min"
          categoryId={row.category_id}
          color="var(--artpiece-info-icon)"
        />
      ),
      node: <div className="text-wrap">{row.name}</div>,
      tooltip: "Name",
    },
    {
      icon: (
        <User
          className="min-h-min min-w-min"
          color="var(--artpiece-info-icon)"
        />
      ),
      node: <div className="text-wrap">{row.artist}</div>,
      tooltip: "Artist",
    },
    {
      icon: (
        <Calendar
          className="min-h-min min-w-min"
          color="var(--muted-foreground)"
        />
      ),
      node: (
        <div className="text-wrap">
          {row.date.toLocaleDateString(navigator.languages[0], {
            year: "numeric",
            month: "2-digit",
          })}
        </div>
      ),
      tooltip: "Date",
    },
    {
      icon: (
        <Dna className="min-h-min min-w-min" color="var(--muted-foreground)" />
      ),
      node: (
        <div className="flex flex-col">
          <div className="text-wrap">
            {genres.join(", ") || (
              <span className="text-muted-foreground">No genres</span>
            )}
          </div>
          {secondary_genres.length > 0 && (
            <div className="text-lg text-wrap text-muted-foreground">
              {secondary_genres.join(", ")}
            </div>
          )}
        </div>
      ),
      tooltip: "Genre" + (has_multiple_genres ? "s" : ""),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 text-xl">
        {entries.map((entry, i) => (
          <div key={i} className="flex min-w-0 items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>{entry.icon}</TooltipTrigger>
              <TooltipContent>{entry.tooltip}</TooltipContent>
            </Tooltip>
            {entry.node}
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
