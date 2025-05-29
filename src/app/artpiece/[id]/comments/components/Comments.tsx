import sql from "@/app/lib/sql";
import CommentForm from "./CommentForm";
import { User } from "@/app/lib/dal";

export default async function Comments(props: CommentsProps) {
  const user = props.user;

  const rows = await sql`
    SELECT
      comment.id,
      comment.content,
      app_user.username,
      app_user.id as user_id
    FROM comment
    JOIN app_user ON comment.user_id = app_user.id
    WHERE comment.artpiece_id = ${props.artpieceId}
    ORDER BY id DESC
  `;

  return (
    <div className="flex h-full flex-col">
      {user && <CommentForm artpieceId={props.artpieceId} userId={user.id} />}
      {rows.map((row: any) => (
        <div key={row.id} className="text-sm last:pb-5">
          <p className="min-w-0 font-bold text-muted-foreground">
            {row.username}{" "}
            <span className="font-normal wrap-break-word text-foreground">
              {row.content}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

type CommentsProps = {
  user?: User;
  artpieceId: number;
};
