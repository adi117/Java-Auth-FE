import "next-auth"
import { TokenClaims } from "./auth/TokenPair"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string
    error?: string,
    user: {
      id: string,
      email: string,
      roles: string[],
    }
  }

  interface UserTokenDetails {
    accessToken: {
      claims: TokenClaims
      value: string
    }
  }

  interface User {
    roles: string[]
    userID: number,
    token: UserTokenDetails
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    roles: string[]
    accessToken: {
      claims: TokenClaims
      value: string
    }
    error?: string
  }
}