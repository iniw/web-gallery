import Artwork from "@/app/components/Artwork";
import Card from "@/app/components/Card";
import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { notFound } from "next/navigation";
import Comments from "./comments/components/Comments";
import Control from "./control/components/Control";
import Info from "./info/components/Info";
import Ratings from "./ratings/components/Ratings";
import Reviews from "./reviews/components/Reviews";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  // TODO: Check type of the route param
  const { id: artpieceId } = await params;

  const user = await getUser();

  const [row] = await sql`
    SELECT id, name
    FROM artpiece
    WHERE id = ${artpieceId}
  `;

  if (!row) notFound();

  return (
    <div
      className="grid h-full gap-5"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr",
        gridTemplateRows: "1fr 1.25fr",
      }}
    >
      <Card title="Artwork" fill>
        <div className="flex h-full items-center justify-center">
          <Artwork
            artpieceId={row.id}
            artpieceName={row.name}
            width="300"
            height="300"
          />
        </div>
      </Card>

      <Card title="Info" fill>
        <Info user={user} artpieceId={artpieceId} />
      </Card>

      <Card title="Control" fill>
        <Control user={user} artpieceId={artpieceId} />
      </Card>

      <Card title="Comments" fill>
        <Comments user={user} artpieceId={artpieceId} />
      </Card>

      <Card title="Reviews" fill>
        <Reviews user={user} artpieceId={artpieceId} />
      </Card>

      <Card title="Ratings" fill>
        <Ratings artpieceId={artpieceId} />
      </Card>
    </div>
  );
}
