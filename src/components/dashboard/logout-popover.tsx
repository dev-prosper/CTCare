"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import api from "@/services/axios-instance";

export default function LogoutPopover() {
  const logOutUser = async () => {
    try {
      const res = await api.post("api/v1/auth/logout-all", {
        refreshToken: "string",
        revokeAllSessions: true,
        employeeId: "53751c3a-499d-1ca-7553-9d496d4e92a7",
      });
      console.log("response ready");
      console.log(res);
    } catch (error) {
      console.error(
        "Login failed:",
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form.",
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="ghost">
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-5">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logOutUser}
        >
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
