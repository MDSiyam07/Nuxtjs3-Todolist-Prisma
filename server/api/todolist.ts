// import { NextApiRequest, NextApiResponse, NextApiRequestWithUser } from 'next'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// interface User {
//     id: number;
//     name: string;
//     password: string;
//     email: string;
//     todos: Todo[];
// }
// interface Todo {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//     completed: boolean;
//     content: string;
//     userId: number;
// }
// interface NextApiRequestWithUser extends NextApiRequest {
//     user: User
// }

// export default async (req: NextApiRequestWithUser, res: NextApiResponse) => {
//   const { method } = req

//   if (!res) {
//     console.error('Response object is undefined');
//     return;
//   }
//   res.setHeader('Content-Type', 'application/json');

//   switch (method) {
//     case 'GET':
//         try {
//             const todos = await prisma.todolist.findMany({
//             where: {
//                 userId: req.user.id,
//             },
//             })
//             res.status(200).json(todos)
//         } catch (error) {
//             console.error(error)
//             res.status(500).json({ error: 'An error occurred while fetching todos.' })
//         }
//         break
//     case 'POST':
//       const newTodo = await prisma.todolist.create({
//         data: {
//           content: req.body.content,
//           User: {
//             connect: {
//               id: req.user.id,
//             },
//           },
//         },
//       })
//       res.status(201).json(newTodo)
//       break
//     case 'PUT':
//       const updatedTodo = await prisma.todolist.update({
//         where: {
//           id: req.body.id,
//         },
//         data: {
//           content: req.body.content,
//           completed: req.body.completed,
//         },
//       })
//       res.status(200).json(updatedTodo)
//       break
//     case 'DELETE':
//       const deletedTodo = await prisma.todolist.delete({
//         where: {
//           id: req.body.id,
//         },
//       })
//       res.status(200).json(deletedTodo)
//       break
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    todos: Todo[];
}

interface Todo {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    content: string;
    userId: number;
}

export default defineEventHandler((event) => { return 'hello'})