import { Button } from "@/shadcn/components/button";
import { LoaderCircle } from "lucide-react";
import { ComponentProps } from "react";
import ButtonWithTooltip from "./ButtonWithTooltip";

export default function FormButton({
  isPending,
  tooltip,
  children,
  ...props
}: FormButtonProps) {
  const body = isPending ? <LoaderCircle className="animate-spin" /> : children;
  return tooltip ? (
    <ButtonWithTooltip tooltip={tooltip} {...props}>
      {body}
    </ButtonWithTooltip>
  ) : (
    <Button {...props}>{body}</Button>
  );
}

type FormButtonProps = {
  isPending: boolean;
  tooltip?: string;
} & ComponentProps<typeof Button>;
