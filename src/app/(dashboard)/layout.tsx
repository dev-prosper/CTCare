"use client";
import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/navigation/header";
import { useRouter } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/"); // redirect if not authenticated
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-cavista-red">
          {" "}
          Checking Authentication ...
        </p>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
