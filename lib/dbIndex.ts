//Forfatter: Torjus A.M
//data access class, pool for connecting to db
import pg from 'pg';
import {QueryResult} from 'pg'

const { Pool,  } = pg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

export const query = (text: string, params: any[]): Promise<QueryResult> => pool.query(text, params);