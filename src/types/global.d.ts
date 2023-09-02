namespace auth {
    declare type AuthRedirect = {
        callbackUrl: string?,
        message: string?
    }
    
    declare type PageAuth = {
        role: UserRole
        loading?: import("react").ReactNode
        unauthorized_redirect?: AuthRedirect
    };
}
