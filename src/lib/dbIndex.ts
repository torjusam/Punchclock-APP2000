//Author: Torjus A.M
//data access class, pool for connecting to db
import pg from 'pg';
import {QueryResult} from 'pg'
process.env.TZ = 'CET';

const { Pool,  } = pg;

export const pool = new Pool({
  connectionString: process.env.PSQL_URL + "?sslmode=require",
})

export const query = (text: string, params: any[]): Promise<QueryResult> => pool.query(text, params);