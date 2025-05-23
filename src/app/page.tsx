import ArtImage from "./components/ArtImage";
import ArtInfo from "./components/ArtInfo";
import sql from "./lib/sql";

export default async function Home() {
  const rows = await sql`
    SELECT c.id as category_id, c.name as category_name, a.id as art_id, a.name as art_name, a.artist as art_artist, a.date as art_date
    FROM category c,
    LATERAL (
      SELECT *
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
      artist: row.art_artist,
      date: row.art_date,
    });
  }

  return (
    <div className="flex flex-col gap-10 p-5">
      {Object.entries(artByCategory).map(([categoryId, category]) => (
        <div key={categoryId}>
          <span className="font-extrabold lg:text-5xl">{category.name}</span>
          <div className="flex gap-5 overflow-x-auto py-2 pl-1">
            {category.arts.map((art) => (
              <div key={art.id} className="group flex gap-5">
                <ArtImage
                  key={art.id}
                  artId={art.id}
                  artName={art.name}
                  width={250}
                  height={250}
                />
                <div className="max-w-0 text-ellipsis transition-[max-width] duration-500 ease-in-out group-hover:max-w-500">
                  <ArtInfo
                    className="truncate"
                    categoryId={Number(categoryId)}
                    name={art.name}
                    artist={art.artist}
                    date={art.date}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
