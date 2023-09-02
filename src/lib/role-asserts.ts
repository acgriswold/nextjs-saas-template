import { UserRole } from "@prisma/client";
import type { Session } from "next-auth";

export function throwIfNotOwner(session: Session | null) {
    throwIfNotRole({ session, expected_role: UserRole.OWNER, error_msg: "Unauthorized: Only visible by owners" })
}

export function throwIfNotTeacher(session: Session | null) {
    throwIfNotRole({ session, expected_role: UserRole.TEACHER, error_msg: "Unauthorized: Only visible by teachers" })
}

export function throwIfNotRole({ session, expected_role, error_msg }: { session: Session | null, expected_role: UserRole, error_msg: string }) {
    if (session?.user?.role === expected_role)
        return;

    throw Error(error_msg)
}