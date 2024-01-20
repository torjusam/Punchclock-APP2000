//Forfatter: Torjus A.M
//data access class, pool for connecting to db
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default pool;