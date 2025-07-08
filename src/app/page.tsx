"use client"

import LoginPage from "./components/LoginDialog";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <LoginPage />
      </div>
    )
  }
  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
