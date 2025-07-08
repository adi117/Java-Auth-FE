// app/components/LoginDialog.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error || !result?.ok) {
      setError("Invalid credentials");
    } else {
      alert("Login successful");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
    >
      <div className="flex flex-col justify-end items-end w-1/2">

        {/* Input username */}
        <div className="flex gap-4">
          <div className="flex gap-1 items-center justify-center">
            <p>56pt</p>
            <div className="w-[18px] border-y-[1px] border-solid border-white flex items-center justify-center">
              <div className="border-solid border-l-[1px] border-white h-14" />
            </div>
          </div>
          <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
            <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
              <div className="flex text-[#8E8E8E] p-[15px] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full flex placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
                />
                <p>@adisain.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-4">
          </div>
        </div>

        {/* Input password */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <div className="flex text-[#8E8E8E] p-[15px] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
              />
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-5">
          </div>
        </div>

        {/* Remember username & forgot password */}
        <div className="flex gap-4">
          <div className="flex gap-1 items-center justify-center h-3">
            <p>12pt</p>
            <div className="w-[18px] border-y-[1px] border-solid border-white flex items-center justify-center">
              <div className="border-solid border-l-[1px] border-white h-3" />
            </div>
          </div>
          <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
            <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full flex items-center justify-between h-3">
              <div className="flex gap-3 text-[#8E8E8E] items-center">
                <Checkbox className="w-3 h-3 border-[#8E8E8E] bg-[#2F2F2F] rounded-[1px] data-[state=checked]:bg-[#2F2F2F] data-[state=checked]:border-[#8E8E8E] data-[state=checked]:text-white" />
                <p className="font-light text-base">Remember me</p>
              </div>
              <li className="font-light text-base text-[#0E8AF2] list-none w-fit px-1"><a href="">Forgot password?</a></li>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-6">
          </div>
        </div>

        {/* Login button */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <button
              type="submit"
              className="font-semibold text-xl text-white py-[15px] bg-[#0E8AF2] w-full rounded-md"
            >Login</button>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

      </div>
    </form>
  );
}
