# Stemplingsskjerm

A touchscreen punchlock for a workplace. Using the Moment.js library, the system handles time calculations and formatting, allowing for accurate tracking of total work hours and overtime. The app has a simple nextAuth authentication system, so that one admin has to open the app before it can be used. 

The app uses a self-defined API to communicate with a PostgreSQL database.

- **URL**: https://app-2000-gruppe20.vercel.app

### Login
To open the app and the API, use the following placeholder credentials:
- **Username**: adminGruppe20@gmail.com
- **Password**: Passord123

# Installation

## Getting Started

To run this project locally, you have to follow these steps:

1. Clone the repository
2. Setup the database
3. Set the environment variables
4. Run the development server

## Database Setup
You will need to setup a database and use the schema.sql file from the SQL dump provided in the repository.

1. **Install PostgreSQL:** If not already installed, you can find installation instructions [here](https://www.postgresql.org/download/).

2. **Create database:** 
   ```bash
   createdb mydatabase

3. **Import schema:**
    ```bash
   psql mydatabase < path/to/schema.sql

## Configure environment variables:
Create a .env.local file in the root directory of your project.
Add your database connection details in the file like this:

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


## Run development server
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

    # then
    npm install
    
This is my first web app :)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
