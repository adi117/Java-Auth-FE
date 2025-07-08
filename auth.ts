import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LoginResponse, TokenClaims } from "./src/types/auth/TokenPair";
import { JWT } from "next-auth/jwt";

// Define config first
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const response = await axios.post(
            "http://localhost:8080/api/v1/public/auth/login",
            {
              email,
              password,
            }
          );

          const { data } = response.data as LoginResponse;

          const decodedToken = jwtDecode<TokenClaims>(data.accessToken.value);

          return {
            id: decodedToken.userId,
            email: decodedToken.email,
            name: decodedToken.name,
            token: {
              accessToken: {
                claims: decodedToken,
                value: data.accessToken.value,
              },
            },
            roles: decodedToken.scope.split(" "),
            userID: parseInt(decodedToken.userId),
          };
        } catch (err) {
          console.error("Login error in authorize():", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.accessToken = user.token.accessToken;
        token.roles = user.roles;
        token.userID = user.userID;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken.value;
      session.user = {
        ...session.user,
        roles: token.roles,
        id: token.accessToken.claims.userId,
      };

      return session;
    },
  },

  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
