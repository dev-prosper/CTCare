"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import api from "@/services/axios-instance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function LogoutPopover() {
  const router = useRouter();

  const logOutUser = async () => {
    const refreshToken = localStorage.getItem("ctc-rft");
    try {
      const res = await api.post("api/v1/auth/logout-all", {
        refreshToken: refreshToken,
        revokeAllSessions: true,
        employeeId: "53751c3a-499d-1c3a-7553-9d496d4e92a7",
      });
      if (res.status === 204) {
        toast.success("Logged Out successfully");
        router.push("/");
        localStorage.removeItem("ctc-act");
        localStorage.removeItem("ctc-rft");
        useAuthStore.getState().clear();
      }
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
