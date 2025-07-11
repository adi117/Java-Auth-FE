"use client";

import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useState } from "react";
import Image from "next/image";
import GoogleLogo from "@/public/google-logo.webp";

const loginSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9.]+$/, {
    message: "Not a valid username!"
  }),
  password: z.string()
})

export type LoginForm = z.infer<typeof loginSchema>;

export default function LoginDialog({ setMenu }: { setMenu: (val: string) => void }) {

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  })

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      email: `${data.username}@adisain.in`,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      console.log("Login failed: ", result.error);
      setError(error);
    } else {
      console.log("Login success!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-end items-end w-[640px]">

        {/* Title and login error */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full pb-10 pt-5">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[28px] font-semibold">Welcome to Adisainin</h1>
              <span className="text-[18px]">Enter your credentials to access your account.</span>
            </div>
            {error && (
              <p>Email or password are incorrect</p>
            )}
          </div>
        </div>

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
                  placeholder="Enter your username"
                  className="w-full flex placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
                  {...register("username")}
                />
                <p>@adisain.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing & username error */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-4">
            {errors.username && (
              <p className="text-[#FF4D4D] text-xs px-1">{errors.username.message}</p>
            )}
          </div>
        </div>

        {/* Input password */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <div className="flex text-[#8E8E8E] p-[15px] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full">
              <input
                type="password"
                placeholder="Password"
                className="placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
                {...register("password")}
              />
            </div>
          </div>
        </div>

        {/* Spacing & password error */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-5">
            {errors.password && (
              <p className="text-[#FF4D4D] text-xs px-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Remember username & forgot password */}
        <div className="flex gap-4">
          <div className="flex gap-1 items-center justify-center h-3">
            <div className="h-3 items-center justify-center flex">
              <p>12pt</p>
            </div>
            <div className="w-[18px] border-y-[1px] border-solid border-white flex items-center justify-center">
              <div className="border-solid border-l-[1px] border-white h-[10px]" />
            </div>
          </div>
          <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
            <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full flex items-center justify-between h-3">
              <div className="flex gap-3 text-[#8E8E8E] items-center">
                <Checkbox className="w-3 h-3 border-[#8E8E8E] bg-[#2F2F2F] rounded-[1px] data-[state=checked]:bg-[#2F2F2F] data-[state=checked]:border-[#8E8E8E] data-[state=checked]:text-white" />
                <p className="font-light text-base">Remember me</p>
              </div>
              <li className="font-light text-base text-[#1E90FF] list-none w-fit px-1"><a href="">Forgot password?</a></li>
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
              className="font-semibold text-xl text-white py-[15px] bg-[#1E90FF] w-full rounded-md hover:bg-[#187BD6]"
            >Login</button>
          </div>
        </div>

        {/* Spacing */}
        <div className="flex">
          <div className="w-[640px] px-[100px]">
            <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-fit">
              <div className="flex w-full items-center gap-4 py-9">
                <div className="bg-[#474747] h-[1px] w-full font-medium" />
                <p>or</p>
                <div className="bg-[#474747] h-[1px] w-full font-medium" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-16 top-0 flex gap-1 items-center justify-center">
              <div className="w-[18px] border-y-[1px] border-solid border-white flex items-center justify-center">
                <div className="border-solid border-l-[1px] border-white h-24" />
              </div>
              <p>96pt</p>
            </div>
          </div>

        </div>

        {/* Login with Google */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <div className="flex text-[#8E8E8E] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full overflow-hidden">
              <button
                className="placeholder-[#8E8E8E] focus:ring-0 focus:outline-0 w-full p-[15px] hover:bg-[#1F1F1F] text-xl font-medium text-white flex items-center justify-center gap-3"
              >
                <Image
                  src={GoogleLogo}
                  alt="Google Logo"
                  height={20}
                  width={20}
                />
                <p>Login with Google</p>
              </button>
            </div>
          </div>
        </div>

        {/* Sign up */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full pb-5 pt-10 justify-center flex">
            <div className="flex items-center justify-center gap-1 text-base text-[#8E8E8E] w-full">
              <span className="text-[18px]">Don&apos;t have an account?</span>
              <li
                className="font-light text-base text-[#1E90FF] list-none w-fit px-1 hover:cursor-pointer"
                onClick={() => setMenu("register")}
                >Sign up</li>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
