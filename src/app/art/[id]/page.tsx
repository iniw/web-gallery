import sql from "@/app/lib/sql";
import { Calendar, Clapperboard, Palette, Disc3, User } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import ArtInfo from "@/app/components/ArtInfo";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const [row] = await sql`
    SELECT *
    FROM art
    WHERE art.id = ${id}
`;

  let icon: ReactNode;
  switch (row.category_id) {
    case 1: // Music
      icon = <Disc3 />;
      break;
    case 2: // Cinema
      icon = <Clapperboard />;
      break;
    case 3: // Painting
      icon = <Palette />;
      break;
  }

  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex gap-5">
        <Image
          className="border-1 drop-shadow-md"
          src={`/${id}/image.jpg`}
          width={350}
          height={350}
          alt={row.name}
        />
        <ArtInfo
          categoryId={row.category_id}
          name={row.name}
          artist={row.artist}
          date={row.date}
        />
      </div>
      <div className="flex h-[600px] w-full gap-5">
        <div className="h-[600px] min-w-[350px] bg-blue-100" />
        <div className="h-[600px] w-full bg-blue-100" />
      </div>
    </div>
  );
}
