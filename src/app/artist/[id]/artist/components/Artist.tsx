import sql from "@/app/lib/sql";
import Image from "next/image";

export default async function Artist(props: ArtistProps) {
  const [row] = await sql`
    SELECT id, name
    FROM artist
    WHERE id = ${props.artistId}
  `;

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col justify-center">
        <span className="text-center text-2xl font-semibold">{row.name}</span>
        <Image
          className="ring-5"
          src={`/artist/${row.id}/picture.jpg`}
          width={300}
          height={300}
          alt={`${row.name}'s picture`}
        />
      </div>
    </div>
  );
}

type ArtistProps = {
  artistId: number;
};
