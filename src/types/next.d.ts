import type { AppContext as AppContextType, AppProps as AppPropsType } from "next/app";
import type { NextComponentType, NextPageContext } from "next";
import type { Session } from "next-auth";

import type { auth, EmptyObject } from "~/types/global";

declare module 'next/app' {
    type NextComponentTypeWithAuth = NextComponentType<NextPageContext, EmptyObject, EmptyObject> & { auth: auth.PageAuth }

    type AppPropsComponentOverride<P = EmptyObject> =
        Omit<AppPropsType<P & { session: Session | null }>, "Component"> &
        { Component: NextComponentTypeWithAuth; }

    declare type AppTypeWithAuth<P = EmptyObject> = NextComponentType<AppContextType, P, AppPropsComponentOverride<P>>
}