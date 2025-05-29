import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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
