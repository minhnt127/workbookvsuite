import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor-store";
import { Redo, Undo } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UndoRedoButtonsProps extends React.ComponentProps<typeof Button> {}

export function UndoRedoButtons({ disabled, ...props }: UndoRedoButtonsProps) {
  const { undo, redo, canUndo, canRedo } = useEditorStore();

  const handleUndo = () => {
    undo();
    toast({ title: "Đã hoàn tác", description: "Thay đổi gần nhất đã được hoàn tác." });
  };

  const handleRedo = () => {
    redo();
    toast({ title: "Đã làm lại", description: "Thay đổi vừa hoàn tác đã được áp dụng lại." });
  };

  return (
    <div className="flex items-center gap-1">
      <TooltipWrapper label="Undo" asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled || !canUndo()}
          {...props}
          onClick={handleUndo}
        >
          <Undo className="size-5" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper label="Redo" asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled || !canRedo()}
          {...props}
          onClick={handleRedo}
        >
          <Redo className="size-5" />
        </Button>
      </TooltipWrapper>
    </div>
  );
}
