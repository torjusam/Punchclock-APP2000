# Stemplingsskjerm

**Stemplingsskjerm** is a full-stack web application designed as a touchscreen punchlock system for workplace environments. Created as a part of the university course APP2000, this project showcases a practical solution to track employee attendance, and calculate work hours efficiently. As my first web project, it represents a personal achievement and a steep learning curve in web dev.

Explore the application here: https://app-2000-gruppe20.vercel.app

### Login
To access the app and the API, use the following placeholder credentials:
- **Username**: adminGruppe20@gmail.com
- **Password**: Passord123

## Key Features:

- **Time Tracking**: Uses the Moment.js library, to handle time calculations and formatting. This feature enables the accurate tracking of total work hours, overtime, work-time balance, and various time intervals.
- **Authentication**: Uses NextAuth for simple user authentication. The project had a requirement that a service-user must log in to activate the app and API. This ensures that access to the system is gated, requiring admin authentication before the application becomes operational.
- **Custom API**: The application uses a self-defined API to interact with a PostgreSQL database. This setup ensures all data transactions are managed efficiently and securely, allowing for scalable data management and real-time updates to the frontend.
- **Deployment**: Hosted on Vercel, the application not only benefits from high availability and reliability but also offered us experience on maintaining and updating a production environment.

### Extra Features:
- The app currently includes a few extra pages accessible by pressing the icon on the bottom left corner (required for the delivery of the project).

## Installation

The app currently has a few extra pages that can be accessed by pressing the icon on the bottom left.

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
