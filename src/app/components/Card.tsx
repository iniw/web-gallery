import { cn } from "@/shadcn/lib/utils";
import { ReactNode } from "react";

export default function Card(props: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card shadow-sm",
        props.fill && "h-0 min-h-full w-0 min-w-full",
        props.className,
      )}
    >
      <span className="border-b-2 p-3 text-2xl font-bold">{props.title}</span>
      <div className="block grow overflow-scroll p-5">{props.children}</div>
    </div>
  );
}

type CardProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  fill?: boolean;
};
