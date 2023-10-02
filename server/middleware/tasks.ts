import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

export default defineEventHandler(async (event) => {
  app.post('/users/:userId/todos', async (req, res) => {
    const { userId } = req.params;
    const { content } = req.body;
    const newTodo = await prisma.todolist.create({
      data: {
        content,
        user: {
          connect: { id: Number(userId) },
        },
      },
    });
    res.json(newTodo);
  });

  app.get('/users/:userId/todos', async (req, res) => {
    const { userId } = req.params;
    const todos = await prisma.todolist.findMany({
      where: {
        userId: Number(userId),
      },
    });
    res.json(todos);
  });
})
