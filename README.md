# Punchclock-module (Stemplingsskjerm)
This webapp was a developed as a university assignment for a third-party software company, and functions as a touchscreen punchlock for a workplace. Employees can clock in and out as they come and go. The module tracks employee attendance and calculates work time on a weekly basis, as well as total overtime (fleksitid). 

#### Hosted on vercel: https://app-2000-gruppe20.vercel.app 

### Login
To access, login with these placeholder credentials:
- **Username**: adminGruppe20@gmail.com
- **Password**: Passord123

## Key Features
- **Authentication** with NextAuth. A requirement was that a service-user must log in to activate the app and API.
- **Middleware and Security**: Implemented in accordance with OWASP Top 10 standards.
- **Time tracking** with the [Moment](https://momentjs.com/) library for time and interval calculations, and formatting.
- **API** is made with [next api-routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes).

#### Extra pages
The app has a few extra pages, accessible by pressing the icon on the bottom left corner, which has features required for the delivery of the project.

# Installation
This is a [Next.js](https://nextjs.org/) project using next pages routing, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
