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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
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
  return (
    <Sidebar>
      <SidebarContent className="py-10 bg-white border-r-2 border-[#ccc]">
        <SidebarGroup className="space-y-8">
          <SidebarGroupLabel className="text-3xl font-bold">
            <span className="text-cavista-red">CT</span>Care
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-6">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-cavista-red hover:text-white py-6"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
