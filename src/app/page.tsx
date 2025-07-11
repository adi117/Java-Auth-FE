"use client"

import { useState } from "react";
import LoginPage from "./components/LoginDialog";
import RegisterDialog from "./components/RegisterDialog";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  const [menu, setMenu] = useState("login");

  if (!session) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        {menu === "login" ? <LoginPage setMenu={setMenu}/> : <RegisterDialog setMenu={setMenu}/>}
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
