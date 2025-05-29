import sql from "@/app/lib/sql";
import Image from "next/image";
import Info from "./info/components/Info";
import Card from "@/app/components/Card";
import Reviews from "./reviews/components/Reviews";
import Comments from "./comments/components/Comments";
import { getUser } from "@/app/lib/dal";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: artpieceId } = await params;

  const user = await getUser();

  const [row] = await sql`
    SELECT *
    FROM artpiece
    WHERE id = ${artpieceId}
  `;

  return (
    <div
      className="grid h-full gap-5"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr",
        gridTemplateRows: "1fr 1.25fr",
      }}
    >
      <Card className="h-0 min-h-full w-0 min-w-full" title="Artwork">
        <div className="flex h-full items-center justify-center">
          <Image
            className={"drop-shadow-md"}
            src={`/artpiece/${row.id}/artwork.jpg`}
            alt={row.name}
            width="300"
            height="300"
          />
        </div>
      </Card>

      <Card className="h-0 min-h-full w-0 min-w-full" title="Info">
        <Info user={user} artpieceId={artpieceId} />
      </Card>

      <Card className="h-0 min-h-full w-0 min-w-full" title="Control"></Card>

      <Card className="h-0 min-h-full w-0 min-w-full" title="Comments">
        <Comments user={user} artpieceId={artpieceId} />
      </Card>

      <Card className="h-0 min-h-full w-0 min-w-full" title="Reviews">
        <Reviews user={user} artpieceId={artpieceId} />
      </Card>

      <Card className="h-0 min-h-full w-0 min-w-full" title="Ratings">
        Oi oi
      </Card>
    </div>
  );
}
