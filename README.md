## Features of Application
- Login
- Register / Create a user
- Logout

## Features of the Todolist
- Add a new task
- Edit a task
- Delete a task

## Tech
![NuxtJS](https://img.shields.io/badge/Nuxt-000?&logo=Nuxtdotjs)
![Prisma](https://img.shields.io/badge/Prisma-008000?&logo=Prisma)
🍍 Pinia
Use of the module @sidebase/nuxt-auth (sidebase.io/nuxt-auth/) for the Authentification system


## Installation
Install the dependencies and start the server.

```sh
cd Nuxtjs3-Todolist-Prisma
npm install
npm run dev
```

For Prisma's database
```sh
npx prisma migrate dev --name init
```

 Open the Prisma's visual editor for the data in your database
```sh
npx prisma studio
```


Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:3000
```
