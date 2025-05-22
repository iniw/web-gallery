import ArtImage from "./components/art-image";
import sql from "./lib/sql";

type ArtByCategory = {
  [id: number]: {
    name: string;
    arts: {
      id: number;
      name: string;
    }[];
  };
};

export default async function Home() {
  const rows = await sql`
    SELECT c.id as category_id, c.name as category_name, a.id as art_id, a.name as art_name
    FROM category c,
    LATERAL (
      SELECT id, name
      FROM art
      WHERE art.category_id = c.id
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
    });
  }

  return (
    <div className="flex flex-col gap-10 p-5">
      {Object.entries(artByCategory).map(([categoryId, category]) => (
        <div key={categoryId}>
          <span className="font-extrabold lg:text-5xl">{category.name}</span>
          <div className="flex gap-10 overflow-x-auto py-2 pl-1">
            {category.arts.map((art) => (
              <ArtImage
                key={art.id}
                artId={art.id}
                artName={art.name}
                width={250}
                height={250}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
