import { useSession } from "next-auth/react";
import type { Router } from "next/router";
import type { PropsWithChildren, ReactNode } from "react";

import type { auth } from "~/types/global";


export function ProtectedElement({ auth, router, children }: PropsWithChildren<{ auth: auth.PageAuth | undefined | null, router: Router }>): ReactNode {
  const { data: sessionData, status } = useSession();

  if (!auth)
    return children;

  if (status === "loading")
    return auth.loading ?? <div>Loading...</div>

  if (auth.match.some(m => m === sessionData?.user?.role))
    return children;

  if (auth.unauthorized_redirect)
    router.push(`/api/auth/signin?msg=${auth.unauthorized_redirect.message}&callbackUrl=${auth.unauthorized_redirect.callbackUrl ?? "/"}`)
      .catch(e => console.error(e))
  else
    router.push(`/api/auth/signin`)
      .catch(e => console.error(e))


  return <></>
}