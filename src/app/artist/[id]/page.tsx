import Card from "@/app/components/Card";
import sql from "@/app/lib/sql";
import { notFound } from "next/navigation";
import Artist from "./artist/components/Artist";
import Artpieces from "./artpieces/components/Artpieces";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  // TODO: Check type of the route param
  const { id: artistId } = await params;

  const [{ exists }] = await sql`
    SELECT EXISTS(SELECT 1 FROM artist WHERE id=${artistId})
  `;

  if (!exists) notFound();

  return (
    <div
      className="grid h-full gap-5"
      style={{
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "1fr",
      }}
    >
      <Card title="Artist" fill>
        <Artist artistId={artistId} />
      </Card>

      <Card title="Artpieces" fill>
        <Artpieces artistId={artistId} />
      </Card>
    </div>
  );
}
