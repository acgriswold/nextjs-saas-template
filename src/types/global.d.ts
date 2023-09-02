import type { ReactNode } from "react";

declare type EmptyObject = Record<string, never>

declare namespace auth {
    declare type AuthRedirect = {
        callbackUrl: string?,
        message: string?
    }
    
    declare type PageAuth = {
        role: UserRole
        loading?: ReactNode
        unauthorized_redirect?: AuthRedirect
    };
}
