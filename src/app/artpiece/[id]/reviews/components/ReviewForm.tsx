"use client";

import FormButton from "@/app/components/FormButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/components/form";
import { SendHorizontal } from "lucide-react";
import NextForm from "next/form";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import createReview from "../actions/createReview";
import { ReviewFormData } from "../lib/ReviewFormSchema";
import ReviewTextarea from "./ReviewTextArea";

export default function ReviewForm(props: ReviewFormProps) {
  const action = createReview.bind(null, props.userId, props.artpieceId);
  const [state, formAction, isPending] = useActionState(action, null);

  const form = useForm<ReviewFormData>({
    disabled: isPending,
  });

  return (
    <Form {...form}>
      <NextForm action={formAction} className="relative">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReviewTextarea {...field} />
              </FormControl>
              <FormMessage>{state?.errors?.content}</FormMessage>
            </FormItem>
          )}
        />
        <FormButton
          type="submit"
          isPending={isPending}
          className="absolute top-0 right-0 z-15 mt-3.5 mr-3"
          tooltip="Submit review"
        >
          <SendHorizontal />
        </FormButton>
        {state?.message && <FormMessage>{state.message}</FormMessage>}
      </NextForm>
    </Form>
  );
}

type ReviewFormProps = {
  userId: number;
  artpieceId: number;
};
