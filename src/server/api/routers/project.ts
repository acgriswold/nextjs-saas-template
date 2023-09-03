import { TRPCError } from "@trpc/server";
import { type ZodType, z } from "zod";

import {
    createTRPCRouter,
    ownerProcedure
} from "~/server/api/trpc";


type createProjectType = { name: string };
const createProjectSchema: ZodType<createProjectType> =
    z.object({
        name: z.string(),
    });


export const projectRouter = createTRPCRouter({
    getProject: ownerProcedure
        .query(async ({ ctx }) => {
            const project = await ctx.prisma.project.findUnique({
                where: {
                    ownerId: ctx.session.user.id
                }
            })

            return project;
        }),

    createProject: ownerProcedure
        .input(createProjectSchema)
        .mutation(async ({ ctx, input }) => {
            const owner = await ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } })

            if (!owner)
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'No user by that id could be found.',
                })

            const project = await ctx.prisma.project.create({
                data: {
                    name: input.name,
                    ownerId: owner.id,
                }
            })

            return project;
        }),
});
