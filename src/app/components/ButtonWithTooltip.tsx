import { Button } from "@/shadcn/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import { ComponentProps } from "react";

export default function ButtonWithTooltip({
  tooltip,
  children,
  ...props
}: ButtonWithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props}>{children}</Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

type ButtonWithTooltipProps = {
  tooltip: string;
} & ComponentProps<typeof Button>;
