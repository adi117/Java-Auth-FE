import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";
import { LoginResponse, TokenClaims } from "@/types/auth/TokenPair";
import { jwtDecode } from "jwt-decode";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {

          const {email, password} = credentials as {email: string; password: string}

          const response = await axios.post("", {
            email,password
          });

          const { data } = response.data as LoginResponse;

          const secret = process.env.JWT_SECRET;
          if (!secret) {
            console.error("JWT secret not set");
            return null;
          }

          try {
            jwt.verify(data.accessToken.value, secret);
          } catch (err) {
            console.error("JWT verification failed: ", err);
            return null;
          }

          const decodedToken = jwtDecode<TokenClaims>(data.accessToken.value);

          const { sub, scope, userId } = decodedToken;

          const parsedResponse: User = {
            id: userId,
            email: sub,
            token: {
              accessToken: {
                claims: decodedToken,
                value: data.accessToken.value,
              },
            },
            roles: scope.split(" "),
            userID: parseInt(userId),
          };

          return parsedResponse ?? null;
        } catch (err) {
          console.error("Login error", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {

    async session({session, token}) {
      session.accessToken = token.accessToken.value;
      session.user = {
        ...session.user,
        roles: token.roles,
        id: token.accessToken.claims.userId
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token = {
          accessToken: {
            claims: user.token.accessToken.claims,
            value: user.token.accessToken.value,
          },
          roles: user.roles,
          userID: user.id,
        };
      }

      return token;
    },

    async signIn({ user }) {
      console.log("IN SIGNIN CALLBACK: ", user);
      return true;
    },
  },
});
