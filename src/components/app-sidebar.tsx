"use client";
import { LayoutDashboard, Settings, ChartNoAxesColumnIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Leave Requests",
    url: "#",
    icon: ChartNoAxesColumnIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent className="py-2.5 border-r border-[#ccc]">
        <SidebarGroup className="space-y-8">
          <SidebarGroupLabel className="text-2xl bg-white font-black flex items-center">
            <Image
              src="/cavista_logo-removebg-preview.png"
              alt="Cavista Technologies Logo"
              height={50}
              width={50}
            />
            <span className="text-cavista-red">CT</span>Care
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="border-t-2 border-[#ccc] pt-8 divide-y divide-[#ccc]">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "hover:bg-white hover:text-cavista-red hover:scale-100 hover:font-bold text-cavista-red font-medium py-6 rounded-none",
                        isActive
                          ? "bg-cavista-red text-white font-bold"
                          : "text-cavista-red hover:bg-gray-100 hover:font-bold",
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
