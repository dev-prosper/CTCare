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
import { useAuthStore } from "@/store/auth-store";

type NavItem = (typeof navItems)[keyof typeof navItems];

// Menu items.
const navItems = {
  dashboard: {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  leaveRequests: {
    title: "Leave Requests",
    url: "/leave-requests",
    icon: ChartNoAxesColumnIcon,
  },
  settings: {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
};

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuthStore();

  let itemsToShow: NavItem[] = [];
  if (role === "manager") {
    itemsToShow = [navItems.dashboard, navItems.leaveRequests];
  } else if (role === "employee") {
    itemsToShow = [navItems.dashboard];
  } else if (role === "people-team") {
    itemsToShow = [navItems.settings];
  }

  return (
    <Sidebar className="">
      <SidebarContent className="py-2.5 border-r border-[#ccc]">
        <SidebarGroup className="space-y-8">
          <SidebarGroupLabel className="text-2xl py-1 bg-white font-black flex items-center gap-1">
            <Image
              src="/cavista-logo.png"
              alt="Cavista Technologies Logo"
              height={50}
              width={50}
            />
            <div className="">
              <h1 className="text-black">
                <span className="text-cavista-red">CT</span>Care
              </h1>
              <p className="text-[10px] font-semibold italic text-black">
                ...Powering care for Cavistans
              </p>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="border-t-2 border-[#ccc] pt-8 divide-y divide-[#ccc]">
              {itemsToShow.map((item) => {
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
