"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider
  basePath="/api/auth"
  refetchInterval={60} // refetch session every 60 seconds
      refetchOnWindowFocus={true} // refetch when user comes back to tab

  >{children}</SessionProvider>;
}
