import { User } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { Textarea } from "@/shadcn/components/textarea";
import RatingDisplay from "@/app/components/RatingDisplay";
import ControlReviewForm from "./ControlReviewForm";
import ReviewForm from "./ReviewForm";

export default async function Reviews(props: ReviewsProps) {
  const user = props.user;

  const rows = await sql`
    SELECT
      review.artpiece_id,
      review.content,
      app_user.username,
      app_user.id as user_id,
      rating.value as rating
    FROM review
    JOIN app_user ON review.user_id = app_user.id
    LEFT JOIN rating ON rating.user_id = review.user_id AND rating.artpiece_id = review.artpiece_id
    WHERE review.artpiece_id = ${props.artpieceId}
    ORDER BY review.inserted_at DESC
  `;

  const userReview = user && rows.find((row: any) => row.user_id == user.id);

  return (
    <div className="flex h-full flex-col gap-5">
      {userReview && (
        <ControlReviewForm
          userId={userReview.user_id}
          artpieceId={userReview.artpiece_id}
          content={userReview.content}
        />
      )}
      {user && !userReview && (
        <ReviewForm artpieceId={props.artpieceId} userId={user.id} />
      )}
      {rows.map(
        (row: any) =>
          row != userReview && (
            <div key={row.user_id} className="last:pb-5">
              <div className="text-md mb-1 flex items-center gap-2 px-1 font-semibold">
                {row.username}
                <div className="ml-auto font-normal">
                  {row.rating ? (
                    <RatingDisplay value={row.rating} />
                  ) : (
                    <span className="text-muted-foreground">Unrated</span>
                  )}
                </div>
              </div>
              <Textarea
                className="resize-none"
                defaultValue={row.content}
                readOnly={true}
              />
            </div>
          ),
      )}
    </div>
  );
}

type ReviewsProps = {
  user?: User;
  artpieceId: number;
};
