"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import ButtonWithTooltip from "@/app/components/ButtonWithTooltip";
import { LoaderCircle, Pencil, SendHorizontal, Trash, X } from "lucide-react";
import { useActionState, useRef, useState } from "react";
import Form from "next/form";
import update_review from "../actions/update_review";
import delete_review from "../actions/delete_review";
import FormButton from "@/app/components/FormButton";

export default function ControlReviewForm(props: ControlReviewFormProps) {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [_updateState, editFormAction, editIsPending] = useActionState(() => {
    const content = contentRef?.current?.value;
    if (content && content.length > 1) {
      setEditing(false);
      update_review(props.userId, props.artpieceId, content);
    }
  }, null);

  const [_deleteState, deleteFormAction, deleteIsPending] = useActionState(
    () => {
      delete_review(props.userId, props.artpieceId);
    },
    null,
  );

  const [editing, setEditing] = useState(false);

  return (
    <Form
      className="relative"
      id="controlForm"
      // Overwriten by the deletion and edit button
      action={() => {}}
    >
      <fieldset disabled={editIsPending || deleteIsPending}>
        <Textarea
          ref={contentRef}
          className="resize-none"
          defaultValue={props.content}
          readOnly={!editing}
        />

        <div className="absolute top-0 right-0 z-15 mt-3.5 mr-3 flex flex-row-reverse gap-2">
          {editing ? (
            <>
              <FormButton
                key="submit"
                type="submit"
                formAction={editFormAction}
                isPending={editIsPending}
                tooltip="Update review"
              >
                <SendHorizontal />
              </FormButton>
              <ButtonWithTooltip
                variant="destructive"
                onClick={() => {
                  setEditing(false);
                  if (contentRef?.current?.value)
                    contentRef.current.value = props.content;
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
                  contentRef?.current?.focus();
                  setEditing(true);
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
      </fieldset>
    </Form>
  );
}

type ControlReviewFormProps = {
  userId: number;
  artpieceId: number;
  content: string;
};
