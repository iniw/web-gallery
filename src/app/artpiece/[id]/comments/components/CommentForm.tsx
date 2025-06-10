"use client";

import FormButton from "@/app/components/FormButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/components/form";
import { Input } from "@/shadcn/components/input";
import { SendHorizontal } from "lucide-react";
import NextForm from "next/form";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import createComment from "../actions/createComment";
import { CommentFormData } from "../lib/CommentFormSchema";

export default function CommentForm(props: CommentFormProps) {
  const action = createComment.bind(null, props.userId, props.artpieceId);
  const [state, formAction, isPending] = useActionState(
    async (formState: unknown, formData: FormData) => {
      const ret = await action(formState, formData);
      if (!(ret?.errors || ret?.message)) form.reset();
      return ret;
    },
    null,
  );

  const form = useForm<CommentFormData>({
    disabled: isPending,
  });

  return (
    <Form {...form}>
      <NextForm action={formAction} className="w-full gap-3 pb-2">
        <div className="flex gap-2.5">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="Leave a comment"
                    autoComplete="off"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormButton
            type="submit"
            variant="outline"
            isPending={isPending}
            tooltip="Submit comment"
          >
            <SendHorizontal />
          </FormButton>
        </div>
        <FormMessage className="mt-1">{state?.errors?.content}</FormMessage>
        <FormMessage className="mt-1">{state?.message}</FormMessage>
      </NextForm>
    </Form>
  );
}

type CommentFormProps = {
  userId: number;
  artpieceId: number;
};
