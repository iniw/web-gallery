import { Button } from "@/shadcn/components/button";
import { LoaderCircle } from "lucide-react";
import { ComponentProps } from "react";
import ButtonWithTooltip from "./ButtonWithTooltip";

export default function FormButton({
  tooltip,
  isPending,
  children,
  ...props
}: FormButtonProps) {
  return (
    <ButtonWithTooltip tooltip={tooltip} {...props}>
      {isPending ? <LoaderCircle className="animate-spin" /> : children}
    </ButtonWithTooltip>
  );
}

type FormButtonProps = {
  tooltip: string;
  isPending: boolean;
} & ComponentProps<typeof Button>;
