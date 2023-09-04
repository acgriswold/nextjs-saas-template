import { type ZodType, z } from "zod";
import { UserRole } from '@prisma/client';

import {
    createTRPCRouter,
    protectedProcedure,
    ownerProcedure
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";


const createAppointment: ZodType<{ projectId: string, startDate: Date; endDate: Date }> =
    z.object({
        projectId: z.string().nonempty(),
        startDate: z.coerce.date().refine((data) => data > new Date(), { message: "Start date must be in the future" }),
        endDate: z.coerce.date()
    })
        .refine((data) => data.endDate > data.startDate, {
            message: "End date cannot be earlier than start date.",
            path: ["endDate"],
        });


const appointmentsByProject: ZodType<{ projectId: string, startDate: Date; endDate: Date }> =
    z.object({
        projectId: z.string().nonempty(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date()
    })
        .refine((data) => data.endDate > data.startDate, {
            message: "End date cannot be earlier than start date.",
            path: ["endDate"],
        });

const updateAppointmentInstructorSchema: ZodType<{ appointmentId: string, instructorId: string }> =
    z.object({
        appointmentId: z.string(),
        instructorId: z.string()
    })

const deleteAppointmentsSchema: ZodType<{ appointmentIds: string[] }> =
    z.object({
        appointmentIds: z.string().array(),
    })


export const appointmentRouter = createTRPCRouter({
    createAppointment: ownerProcedure
        .input(createAppointment)
        .mutation(async ({ ctx, input: { projectId, startDate, endDate } }) => {

            const createdAppointment = await ctx.prisma.appointment.create({
                data: {
                    projectId,
                    start: startDate,
                    end: endDate
                }
            })

            return createdAppointment;
        }),

    getAppointmentsByProject: protectedProcedure
        .input(appointmentsByProject)
        .query(async ({ ctx, input: { projectId, startDate, endDate } }) => {
            const appointments = await ctx.prisma.appointment.findMany({
                where: {
                    projectId: projectId,
                    start: {
                        lte: endDate,
                        gte: startDate,
                    }
                }
            });

            return appointments;
        }),

    updateAppointmentInstructor: ownerProcedure
        .input(updateAppointmentInstructorSchema)
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    id: input.instructorId
                }
            })

            if (!user)
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'No user by that id could be found.',
                });


            if (user?.role !== UserRole.TEACHER && user?.role !== UserRole.OWNER)
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Only teachers and owners can be assigned to instruct an appointment.',
                });

            const updatedAppointment = await ctx.prisma.appointment.update({
                where: {
                    id: input.appointmentId
                },
                data: {
                    instructorId: user.id
                }
            })

            return updatedAppointment;
        }),

    deleteAppointments: ownerProcedure
        .input(deleteAppointmentsSchema)
        .mutation(async ({ ctx, input }) => {
            const deletedAppointmentCount = await ctx.prisma.appointment.deleteMany({
                where: {
                    id: {
                        in: input.appointmentIds
                    }
                }
            })

            return deletedAppointmentCount
        }),
});
