import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ResetButtonProps extends React.ComponentProps<typeof Button> {}

export function ResetButton({ className, onClick, ...props }: ResetButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      toast({ title: "Đã reset theme", description: "Theme đã được đưa về trạng thái preset gần nhất." });
    }
  };

  return (
    <TooltipWrapper label="Reset to preset defaults" asChild>
      <Button variant="ghost" size="sm" className={cn("gap-2", className)} onClick={handleClick} {...props}>
        <RefreshCw className="size-5" />
        <span className="hidden text-sm md:block">Reset</span>
      </Button>
    </TooltipWrapper>
  );
}
