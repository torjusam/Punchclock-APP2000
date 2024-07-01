import pg from 'pg';

process.env.TZ = 'CET';

const {Pool} = pg;

// Export the pool object for use in other files.
export const pool = new Pool({
    connectionString: process.env.PSQL_URL + "?sslmode=require",
})