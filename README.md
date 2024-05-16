# Stemplingsskjerm

**Stemplingsskjerm** is a full-stack webapp that functions as a touchscreen punchlock for a workplace. Created as a part of the uni course, this project is a solution to track employee attendance and calculate work hours. 

Hosted on vercel: https://app-2000-gruppe20.vercel.app


### Login


To access, login with these placeholder credentials:
- **Username**: adminGruppe20@gmail.com
- **Password**: Passord123

## Key Features


- **Authentication**: Uses NextAuth for authentication. A requirement was that a service-user must log in to activate the app and API.
- **Time Tracking**: Uses the [Moment](https://momentjs.com/) library for time and interval calculations, and formatting.
- **API**: API is made with [next api-routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) to interact with a PostgreSQL database.

#### Extra pages
The app has a few extra pages, accessible by pressing the icon on the bottom left corner, which has features required for the delivery of the project.

# Installation
This is a [Next.js](https://nextjs.org/) project using next pages routing, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Database
You will need to setup a database using the schema.sql file, either locally or on a cloud service, like [vercel postgres.](https://vercel.com/storage/postgres) 

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


## Run dev server


    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

    # then
    npm install
    
