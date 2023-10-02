import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
    const { id } = body;

    const publishedTodo = await prisma.todolist.update({
        where: { id: Number(id) },
        data: { published: true },
    });

    setResponseStatus(event, 200);
    return { publishedTodo };
});
