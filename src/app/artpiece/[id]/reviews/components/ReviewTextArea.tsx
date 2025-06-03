import { Textarea } from "@/shadcn/components/textarea";
import { cn } from "@/shadcn/lib/utils";
import { ComponentProps } from "react";

export default function ReviewTextarea({
  className,
  ...props
}: Omit<ComponentProps<typeof Textarea>, "placeholder">) {
  return (
    <Textarea
      {...props}
      className={cn(
        "h-12 resize-none transition-[height] duration-300 focus:h-60 dark:bg-secondary",
        className,
      )}
      placeholder="Leave your review"
    />
  );
}
