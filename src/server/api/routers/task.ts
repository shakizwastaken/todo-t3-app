import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { Task } from "@prisma/client";

const taskRouter = createTRPCRouter({
  findById: publicProcedure
    .input(z.string())
    .query(
      async ({ input: id }) => await prisma?.task.findFirst({ where: { id } })
    ),
  findAll: publicProcedure.query(async () => await prisma?.task.findMany()),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullable(),
        color: z.string().nullable(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input }) =>
        await prisma.task.create({ data: input })
    ),

  delete: publicProcedure
    .input(z.string())
    .mutation(
      async ({ input: id }) => await prisma?.task.delete({ where: { id } })
    ),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        color: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id, ...data } }) => {
      //clean data

      //@ts-ignore
      let cleanData: Task = { id };

      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined)
          cleanData[key as keyof Task] = value;
      });

      return await prisma.task.update({
        where: { id },
        data: { ...cleanData },
      });
    }),
});

export default taskRouter;
