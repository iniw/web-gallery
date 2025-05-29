import { Disc3, Clapperboard, Palette, Heart, LucideProps } from "lucide-react";

export function IconForCategory({
  categoryId,
  ...props
}: IconForCategoryProps) {
  switch (categoryId) {
    case 1: // Music
      return <Disc3 {...props} />;
    case 2: // Cinema
      return <Clapperboard {...props} />;
    case 3: // Painting
      return <Palette {...props} />;
    default:
      return <Heart {...props} />;
  }
}

type IconForCategoryProps = {
  categoryId: number;
} & LucideProps;
