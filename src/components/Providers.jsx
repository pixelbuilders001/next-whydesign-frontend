"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/lib/AuthContext";

export default function Providers({ children }) {
  return (
    <SessionProvider
      basePath="/api/auth"
      refetchInterval={60} // refetch session every 60 seconds
      refetchOnWindowFocus={true} // refetch when user comes back to tab
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
