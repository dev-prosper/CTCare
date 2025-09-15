import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <header className="flex justify-between w-full px-8 items-center py-6 border-b-2 border-[#ccc]">
      <SidebarTrigger />

      <nav className="flex items-center gap-8">
        <span>
          <Bell />
        </span>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className="flex gap-2 font-semibold">
            John Doe{" "}
            <span>
              <ChevronDown />
            </span>
          </p>
        </div>
      </nav>
    </header>
  );
}
