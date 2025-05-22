import sql from "@/app/lib/sql";
import { Calendar, Clapperboard, Disc3, User } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

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
    case 1:
      icon = <Disc3 />;
      break;
    case 2:
      icon = <Clapperboard />;
      break;
  }

  return (
    <div className="flex p-5">
      <div className="flex gap-5">
        <Image
          className="border-1 drop-shadow-md"
          src={`/${id}/image.jpg`}
          width={500}
          height={500}
          alt={row.name}
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <p className="text-3xl font-bold">{row.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <User />
            <p className="text-2xl"> {row.artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar />
            <p className="text-xl">
              {row.date.toLocaleDateString(navigator.languages[0], {
                year: "numeric",
                month: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
