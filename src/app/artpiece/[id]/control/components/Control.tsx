import { User } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import RatingForm from "./RatingForm";

export default async function Control(props: ControlProps) {
  if (!props.user) {
    return (
      <div className="text-center text-muted-foreground">
        Please log in to rate this artpiece
      </div>
    );
  }

  const [currentRatingRow] = await sql`
    SELECT value
    FROM rating
    WHERE user_id = ${props.user.id} AND artpiece_id = ${props.artpieceId}
  `;

  return (
    <RatingForm
      userId={props.user.id}
      artpieceId={props.artpieceId}
      currentRating={currentRatingRow?.value}
    />
  );
}

type ControlProps = {
  user?: User;
  artpieceId: number;
};
