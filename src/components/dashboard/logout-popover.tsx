import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";
export default function LogoutPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="mt-5">
        <div>
          <Button variant="ghost" className="w-full text-left">
            {" "}
            <LogOut /> <span>Log Out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
