import { cn } from "@/lib/utils";
import { Disc3, Clapperboard, Palette, User, Calendar } from "lucide-react";
import { ReactNode } from "react";

export default function ArtInfo(props: ArtInfoProps) {
  let icon: ReactNode;
  switch (props.categoryId) {
    case 1: // Music
      icon = <Disc3 />;
      break;
    case 2: // Cinema
      icon = <Clapperboard />;
      break;
    case 3: // Painting
      icon = <Palette />;
      break;
  }

  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-3xl font-bold">{props.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <User />
        <p className="text-2xl"> {props.artist}</p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar />
        <p className="text-xl">
          {props.date.toLocaleDateString(navigator.languages[0], {
            year: "numeric",
            month: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

interface ArtInfoProps {
  categoryId: number;
  name: string;
  artist: string;
  date: Date;
  className?: string;
}
