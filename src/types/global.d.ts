import type { ReactNode } from "react";
import type { UserRole } from "@prisma/client";

declare type EmptyObject = Record<string, never>

declare namespace auth {
    declare type AuthRedirect = {
        callbackUrl: string?,
        message: string?
    }
    
    declare type PageAuth = {
        match: UserRole[]
        loading?: ReactNode
        unauthorized_redirect?: AuthRedirect
    };
}
