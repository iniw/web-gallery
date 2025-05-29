import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { LoaderCircle } from "lucide-react";

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
