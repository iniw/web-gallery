import postgres from "postgres";
import newGlobal from "./global";

const sql = newGlobal("sql", () =>
  postgres({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "web-gallery",
  }),
);

export default sql;
