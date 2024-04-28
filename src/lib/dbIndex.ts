/**
 * @file This file is the entry point for the database connection.
 * It exports a pool object that is used to query the database.
 * @Author Torjus A.M
 */
import pg from 'pg';

process.env.TZ = 'CET';

const {Pool} = pg;

// Export the pool object for use in other files.
export const pool = new Pool({
    connectionString: process.env.PSQL_URL + "?sslmode=require",
})