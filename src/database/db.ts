import { Pool } from "pg";

const connectionString =
  "postgres://uercpcyn:kJ4ZX_iexUffjszF4E7NvGYZTBFUqbfX@kesavan.db.elephantsql.com/uercpcyn";

const db = new Pool({ connectionString });

export default db;
