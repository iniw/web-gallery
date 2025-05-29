"use client";

import { SendHorizontal } from "lucide-react";
import create_comment from "../actions/create_comment";
import { useActionState, useRef } from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import FormButton from "@/app/components/FormButton";

export default function CommentForm(props: CommentFormProps) {
  const contentRef = useRef<HTMLInputElement>(null);

  const [_, formAction, isPending] = useActionState(() => {
    const content = contentRef?.current?.value;
    if (content && content.length > 1)
      create_comment(props.userId, props.artpieceId, content);
  }, null);

  return (
    <Form action={formAction}>
      <fieldset disabled={isPending} className="flex gap-3 pb-5">
        <Input ref={contentRef} placeholder="Leave a comment" />
        <FormButton
          type="submit"
          variant="outline"
          tooltip="Submit comment"
          isPending={isPending}
        >
          <SendHorizontal />
        </FormButton>
      </fieldset>
    </Form>
  );
}

type CommentFormProps = {
  userId: number;
  artpieceId: number;
};
