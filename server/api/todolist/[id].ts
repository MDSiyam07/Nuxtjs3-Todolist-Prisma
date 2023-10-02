import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { id } = event.req.params;
  
    if (event.req.method === 'GET') {
      const todo = await prisma.todolist.findUnique({
        where: { id: Number(id) },
      });
      return { todo };
    }
  
    else if (event.req.method === 'PUT') {
      const body = await readBody(event);
      const updatedTodo = await prisma.todolist.update({
        where: { id: Number(id) },
        data: body,
      });
      setResponseStatus(event, 200);
      return { updatedTodo };
    }
  
    else if (event.req.method === 'DELETE') {
      await prisma.todolist.delete({
        where: { id: Number(id) },
      });
      setResponseStatus(event, 204);
      return;
    }
  
    else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed',
      });
    }
  });
