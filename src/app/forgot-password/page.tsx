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
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "@/schemas";
import z from "zod";
import Link from "next/link";

export type ResetPasswordSchema = z.infer<typeof PasswordResetSchema>;

export default function ForgotPasswordPage() {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordReset = async () => {};

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
              onSubmit={form.handleSubmit(handlePasswordReset)}
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

              <div className="flex justify-between items-end">
                <Button className="bg-cavista-red px-8">
                  <span>
                    <Lock />
                  </span>
                  Request Reset
                </Button>

                <Link
                  href="/"
                  className="text-[12px] font-medium text-cavista-red hover:underline flex items-center gap-1"
                >
                  <span>Back to Login</span>
                  <ArrowLeft className="size-[1em]" />
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
