type RatingDisplayProps = {
  value: number;
};

export default function RatingDisplay({ value }: RatingDisplayProps) {
  return (
    <span className="font-mono text-foreground tabular-nums">
      {value}
      <span className="text-muted-foreground">/10</span>
    </span>
  );
}
