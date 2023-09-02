import type { Session } from "next-auth";

import type { AppContext as AppContextType, AppProps as AppPropsType } from "next/app";
import type { NextComponentType, NextPageContext } from "next";

declare module 'next/app' {
    interface SessionProps { session: Session | null }

    type EmptyObject = Record<string, never>

    type NextComponentTypeWithAuth = NextComponentType<NextPageContext, EmptyObject, EmptyObject> & { auth: auth.PageAuth }

    type AppPropsComponentOverride<P> =
        Omit<AppPropsType<P & SessionProps>, "Component"> &
        { Component: NextComponentTypeWithAuth; }

    declare type AppTypeWithAuth<P = EmptyObject> = NextComponentType<AppContextType, P, AppPropsComponentOverride<P>>
}