"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import Image from "next/image";
import GoogleLogo from "@/public/google-logo.webp";
import { cn } from "@/lib/utils";
import { registerUser } from "../services/userService";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const registerSchema = z.object({
  name: z.string().min(5, { message: "Minimum is 5 characters" }).regex(/^[a-zA-Z ]+$/, { message: "Name cannot contains number or symbols" }),
  username: z.string().regex(/^[a-zA-Z0-9.]+$/, {
    message: "Not a valid username!"
  }),
  password:
    z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must include at least one special character")
})

export type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterDialog({ setMenu }: { setMenu: (val: string) => void }) {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  })

  const watchPassword = watch("password", "");

  const passwordSpec = [
    {
      label: "At least 8 characters",
      isValid: watchPassword.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      isValid: /[A-Z]/.test(watchPassword),
    },
    {
      label: "At least one lowercase letter",
      isValid: /[a-z]/.test(watchPassword),
    },
    {
      label: "At least one number",
      isValid: /[0-9]/.test(watchPassword),
    },
    {
      label: "At least one special character",
      isValid: /[^A-Za-z0-9]/.test(watchPassword),
    }
  ]

  const onSubmit = async (data: RegisterForm) => {
    // set loading to true to show loading
    setLoading((val) => !val);
    try {
      const response = await registerUser({
        name: data.name,
        username: data.username,
        password: data.password
      })
      // set loading to false if success to hit endpoint
      setLoading((val) => !val);
      console.log(response);
    } catch (err) {
      console.error("failed to register", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-end items-end w-[640px]">

        {/* Title and login */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full pb-10 pt-5">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[28px] font-semibold">Register to Adisainin</h1>
              <span className="text-[18px]">Enter your credentials to access your account.</span>
            </div>
          </div>
        </div>

        {/* Input name */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <div className="flex text-[#8E8E8E] p-[15px] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full">
              <input
                type="text"
                placeholder="Your full name"
                className="w-full flex placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
                {...register("name")}
              />
            </div>
          </div>
        </div>

        {/* Spacing & name error */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-4">
            {errors.name && (
              <p className="text-[#FF4D4D] text-xs px-1">{errors.name.message}</p>
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

        {/* Create password */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <div className="flex text-[#8E8E8E] p-[15px] border-solid border-[1px] border-[#8E8E8E] bg-[#2F2F2F] rounded-md w-full">
              <input
                type="password"
                placeholder="Create your password"
                className="placeholder-[#8E8E8E] focus:ring-0 focus:outline-0"
                {...register("password")}
              />
            </div>
          </div>
        </div>

        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            {passwordSpec.map((spec, i) => (
              <li
                key={i}
                className={cn("list-none px-1 text-sm", spec.isValid ? "text-green-500" : "text-red-500")}
              >✓ {spec.label}
              </li>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div className="w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full h-6">
          </div>
        </div>

        {/* Register button button */}
        <div className="border-y-[1px] border-solid border-[#8E8E8E] w-[640px] px-[100px]">
          <div className="border-x-[1px] border-solid border-[#8E8E8E] w-full">
            <button
              type="submit"
              className="py-[15px] bg-[#1E90FF] w-full rounded-md hover:bg-[#187BD6]"
            >
              {loading
              ? <Spinner size={"small"} className="text-white"/>
              : <p className="font-semibold text-xl text-white">Register</p>
              }
            </button>
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
              <span className="text-[18px]">Already have an account?</span>
              <li
                className="font-light text-base text-[#1E90FF] list-none w-fit px-1 cursor-pointer"
                onClick={() => setMenu("login")}
              >
                Login</li>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
