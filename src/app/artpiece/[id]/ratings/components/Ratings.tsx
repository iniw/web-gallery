import sql from "@/app/lib/sql";
import RatingDisplay from "@/app/components/RatingDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/table";

export default async function Ratings(props: RatingsProps) {
  const ratings = await sql`
    SELECT
      app_user.username,
      rating.value,
      rating.inserted_at
    FROM rating
    JOIN app_user ON app_user.id = rating.user_id
    WHERE rating.artpiece_id = ${props.artpieceId}
    ORDER BY rating.inserted_at DESC
  `;

  if (ratings.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No ratings yet
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratings.map((rating: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{rating.username}</TableCell>
            <TableCell className="text-center">
              <RatingDisplay value={rating.value} />
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {new Date(rating.inserted_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type RatingsProps = {
  artpieceId: number;
};
