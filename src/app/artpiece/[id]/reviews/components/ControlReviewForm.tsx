"use client";

import ButtonWithTooltip from "@/app/components/ButtonWithTooltip";
import FormButton from "@/app/components/FormButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/alert-dialog";
import { Button } from "@/shadcn/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/components/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import { LoaderCircle, Pencil, SendHorizontal, Trash, X } from "lucide-react";
import NextForm from "next/form";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import deleteReview from "../actions/deleteReview";
import updateReview from "../actions/updateReview";
import { ReviewFormData } from "../lib/ReviewFormSchema";
import ReviewTextarea from "./ReviewTextArea";

export default function ControlReviewForm(props: ControlReviewFormProps) {
  const updateAction = updateReview.bind(null, props.userId, props.artpieceId);
  const [updateState, updateFormAction, updateIsPending] = useActionState(
    async (formState: unknown, formData: FormData) => {
      const ret = await updateAction(formState, formData);
      if (!(ret?.errors || ret?.message)) setEditing(false);
      return ret;
    },
    null,
  );

  const deleteAction = deleteReview.bind(null, props.userId, props.artpieceId);
  const [deleteState, deleteFormAction, deleteIsPending] = useActionState(
    deleteAction,
    null,
  );

  const form = useForm<ReviewFormData>({
    disabled: updateIsPending || deleteIsPending,
  });

  const [editing, setEditing] = useState(false);

  return (
    <Form {...form}>
      <NextForm className="relative" id="controlForm" action={updateFormAction}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReviewTextarea
                  defaultValue={props.content}
                  readOnly={!editing}
                  {...field}
                />
              </FormControl>
              <FormMessage>{updateState?.errors?.content}</FormMessage>
            </FormItem>
          )}
        />
        {updateState?.message && (
          <FormMessage>{updateState?.message}</FormMessage>
        )}
        {deleteState?.message && (
          <FormMessage>{deleteState?.message}</FormMessage>
        )}
        <div className="absolute top-0 right-0 z-15 mt-3.5 mr-3 flex flex-row-reverse gap-2">
          {editing ? (
            <>
              <FormButton
                key="submit"
                type="submit"
                isPending={updateIsPending}
                tooltip="Update review"
              >
                <SendHorizontal />
              </FormButton>
              <ButtonWithTooltip
                key="cancel"
                variant="destructive"
                onClick={() => {
                  setEditing(false);
                  form.setValue("content", props.content);
                }}
                tooltip="Cancel edit"
              >
                <X />
              </ButtonWithTooltip>
            </>
          ) : (
            <>
              <ButtonWithTooltip
                key="edit"
                onClick={() => {
                  setEditing(true);
                  form.setFocus("content");
                }}
                tooltip="Edit review"
              >
                <Pencil />
              </ButtonWithTooltip>

              <Tooltip>
                <AlertDialog>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        {deleteIsPending ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <Trash />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete review?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          type="submit"
                          form="controlForm"
                          formAction={deleteFormAction}
                        >
                          Continue
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <TooltipContent>Delete review</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </NextForm>
    </Form>
  );
}

type ControlReviewFormProps = {
  userId: number;
  artpieceId: number;
  content: string;
};
