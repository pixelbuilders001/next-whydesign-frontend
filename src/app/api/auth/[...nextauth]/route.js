import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and profile data to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user properties to the session
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  // Explicitly set the URL for production
  ...(process.env.NEXTAUTH_URL && { 
    url: process.env.NEXTAUTH_URL 
  }),
};

// ✅ ALSO CORRECT
export const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;