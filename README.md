# Stemplingsskjerm

**Stemplingsskjerm** is a full-stack webapp that functions as a touchscreen punchlock for a workplace. Created as a part of the uni course, this project is a solution to track employee attendance and calculate work hours. This is my first web app.

Explore the app here: https://app-2000-gruppe20.vercel.app

### Login
To access the app and the API, use these placeholder credentials:
- **Username**: adminGruppe20@gmail.com
- **Password**: Passord123

## Key Features

- **Time Tracking**: Uses the Moment library for time calculations and formatting. Accurate tracking of total work hours, overtime, work-time balance, and other intervals.
- **Authentication**: Uses NextAuth for a user authentication. A requirement was that a service-user must log in to activate the app and API.
- **Custom API**: The app uses a self-defined API, using next api-routes to interact with a PostgreSQL database.

#### Extra pages
The app currently has a few extra pages accessible by pressing the icon on the bottom left corner (required for the delivery of the project).

# Installation

## Getting Started

To run the project locally, this is how we've done it:
1. Clone the repo
2. Setup the database
3. Set the environment variables
4. Run the development server

## Database Setup
You will need to setup a database and use the schema.sql file from the SQL dump provided in the repository.

1. **Install PostgreSQL:** Installation instructions [here](https://www.postgresql.org/download/).

2. **Create database:** 
   ```bash
   createdb mydatabase

3. **Import schema:**
    ```bash
   psql mydatabase < path/to/schema.sql

## Environment variables
Create a .env.local file in the root directory. Add the DB connection details in the file like this:

    PSQL_URL=
    PSQL_PRISMA_URL=
    PSQL_URL_NO_SSL=
    PSQL_URL_NON_POOLING=
    PSQL_USER=
    PSQL_HOST=
    PSQL_PASSWORD=
    PSQL_DATABASE=

Then, add a .env file in the root.
Add these two [NextAuth environment variables](https://next-auth.js.org/configuration/options)

    NEXTAUTH_SECRET=random_secret
    NEXTAUTH_URL=http://localhost:3000


## Development server
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

    # then
    npm install
    
This is a [Next.js](https://nextjs.org/) project using next pages routing, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
