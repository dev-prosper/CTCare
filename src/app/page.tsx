"use client";
import Image from "next/image";
import React from "react";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema } from "@/schemas";
import z from "zod";
import Link from "next/link";
import { toast } from "react-toastify";
import api from "@/services/axios-instance";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export type LoginSchema = z.infer<typeof UserLoginSchema>;

export default function Page() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      useOtp: false,
      ip: "string",
      userAgent: "string",
    },
  });

  const router = useRouter();

  const handleLogin = async (data: LoginSchema) => {
    try {
      const res = await api.post("/api/v1/auth/login", data);
      console.log(res.data);
      if (res.status === 200) {
        const { accessToken, refreshToken, employeeId, roles } = res.data;
        localStorage.setItem("ctc-act", accessToken);
        localStorage.setItem("ctc-rft", refreshToken);
        useAuthStore.getState().setUser(employeeId, roles);

        console.log(employeeId, roles);

        toast.success("Login Successful");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        `Login failed: ${
          error instanceof Error
            ? error.message
            : "An error occurred while logging in"
        }`,
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="relative h-screen flex-1">
        <Image
          src="/wellnessRoom.jpeg"
          alt="Cavista Wellness Room"
          fill
          className="object-cover"
        />
      </div>

      <div className="h-screen w-1/2 flex justify-center items-center flex-col gap-5">
        <div className="flex items-center">
          <div className="relative h-20 w-20">
            <Image
              src="/cavista-logo.png"
              alt="Cavista Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl">
              <span className="text-cavista-red">CT</span>Care
            </h1>
            <p className="text-[12px] font-semibold italic">
              ...Powering care for Cavistans
            </p>
          </div>
        </div>

        <div>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleLogin)}
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 border-b-2 border-gray-300 rounded-none w-96 py-6.5 focus:ring-0 focus-visible:border-b-cavista-red focus-visible:bg-white"
                        type="email"
                        {...field}
                        placeholder="Enter your Axxess email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-white border-0 border-b-2 border-gray-300 rounded-none w-96 py-6.5 focus:ring-0 focus-visible:border-b-cavista-red focus-visible:bg-white"
                        type="password"
                        {...field}
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-end">
                <Button className="bg-cavista-red px-8">
                  <span>
                    <Lock />
                  </span>
                  Login
                </Button>

                <Link
                  href="/forgot-password"
                  className="text-[12px] font-medium text-cavista-red hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
