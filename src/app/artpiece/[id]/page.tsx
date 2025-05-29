import sql from "@/app/lib/sql";
import { Calendar, Clapperboard, Palette, Disc3, User } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import ArtPieceInfo from "@/app/components/ArtInfo";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const [row] = await sql`
    SELECT *
    FROM artpiece
    WHERE artpiece.id = ${id}
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
    <div
      className="grid h-full gap-2"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      <div className="flex items-center justify-center border p-5">
        <Image
          className={"drop-shadow-md"}
          src={`/${row.id}/image.jpg`}
          alt={row.name}
          width="300"
          height="300"
        />
      </div>
      <div className="border p-5">
        <ArtPieceInfo
          categoryId={row.category_id}
          name={row.name}
          artist={row.artist}
          date={row.date}
        />
      </div>
      <div className="border p-5">C</div>
      <div className="border p-5">D</div>
      <div className="border p-5"></div>
      <div className="border p-5">F</div>
    </div>
  );
}
