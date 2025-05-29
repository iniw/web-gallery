"use client";

import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import create_review from "../actions/create_review";
import { useActionState, useRef } from "react";
import Form from "next/form";
import FormButton from "@/app/components/FormButton";

export default function ReviewForm(props: ReviewFormProps) {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [_, formAction, isPending] = useActionState(() => {
    const content = contentRef?.current?.value;
    if (content && content.length > 1)
      create_review(props.userId, props.artpieceId, content);
  }, null);

  return (
    <Form action={formAction}>
      <fieldset disabled={isPending} className="relative">
        <Textarea
          ref={contentRef}
          className="h-12 resize-none transition-[height] duration-300 focus:h-60 dark:bg-secondary"
          placeholder="Leave your review"
        />
        <FormButton
          type="submit"
          isPending={isPending}
          className="absolute top-0 right-0 z-15 mt-3.5 mr-3"
          tooltip="Submit review"
        >
          <SendHorizontal />
        </FormButton>
      </fieldset>
    </Form>
  );
}

type ReviewFormProps = {
  userId: number;
  artpieceId: number;
};
