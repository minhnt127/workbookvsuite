import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "inline-flex w-fit items-stretch [&>*]:relative [&>*]:focus-visible:z-10 [&>*:not(:first-child)]:-ml-px",
  {
    variants: {
      orientation: {
        horizontal:
          "flex-row [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:ml-0 [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
);

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { ButtonGroup, buttonGroupVariants };
