import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
    const userId = body.userId;

    if (event.node.req.method === 'GET') {
        const todos = await prisma.todolist.findMany({
            where: {
              userId: Number(userId),
            },
        });
        return { todos };
    }
    else if (event.node.req.method === 'POST') {
        const { content } = body;
        const newTodo = await prisma.todolist.create({
            data: {
              content,
              userId: Number(userId),
              isFinished: false,
            },
        });
        setResponseStatus(event, 201);
        return { newTodo };
    }
    else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed',
        });
    }
});