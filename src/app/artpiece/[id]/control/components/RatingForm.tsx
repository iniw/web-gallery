"use client";

import ButtonWithTooltip from "@/app/components/ButtonWithTooltip";
import FormButton from "@/app/components/FormButton";
import RatingDisplay from "@/app/components/RatingDisplay";
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
  FormLabel,
  FormMessage,
} from "@/shadcn/components/form";
import { Slider } from "@/shadcn/components/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/tooltip";
import { Edit, Plus, SendHorizontal, Trash, X } from "lucide-react";
import NextForm from "next/form";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import createRating from "../actions/createRating";
import deleteRating from "../actions/deleteRating";
import { RatingFormData } from "../lib/RatingFormSchema";

export default function RatingForm(props: RatingFormProps) {
  const hasRating = props.currentRating !== undefined;
  const [isEditing, setIsEditing] = useState(false);

  const createAction = createRating.bind(null, props.userId, props.artpieceId);
  const [createState, createFormAction, createIsPending] = useActionState(
    async (formState: unknown, formData: FormData) => {
      const ret = await createAction(formState, formData);
      if (!(ret?.errors || ret?.message)) setIsEditing(false);
      return ret;
    },
    null,
  );

  const deleteAction = deleteRating.bind(null, props.userId, props.artpieceId);
  const [deleteState, deleteFormAction, deleteIsPending] = useActionState(
    deleteAction,
    null,
  );

  const form = useForm<RatingFormData>({
    disabled: createIsPending || deleteIsPending,
    defaultValues: {
      value: props.currentRating ?? 0,
    },
  });

  return (
    <Form {...form}>
      <NextForm id="ratingForm" action={createFormAction}>
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 flex items-center">
                {hasRating ? (
                  <span className="text-xl font-medium tabular-nums">
                    <RatingDisplay
                      value={
                        isEditing || createIsPending
                          ? field.value
                          : (props.currentRating as number)
                      }
                    />
                  </span>
                ) : isEditing || createIsPending ? (
                  <span className="text-xl font-medium tabular-nums">
                    <RatingDisplay value={field.value} />
                  </span>
                ) : (
                  <span className="text-xl text-muted-foreground">Unrated</span>
                )}

                <div className="ml-auto flex gap-2">
                  {isEditing ? (
                    <>
                      <ButtonWithTooltip
                        key="cancel"
                        variant="destructive"
                        onClick={() => {
                          setIsEditing(false);
                          form.setValue("value", props.currentRating ?? 0);
                        }}
                        tooltip="Cancel edit"
                      >
                        <X />
                      </ButtonWithTooltip>
                      <FormButton
                        key="submit"
                        type="submit"
                        isPending={createIsPending}
                        tooltip="Submit rating"
                      >
                        <SendHorizontal />
                      </FormButton>
                    </>
                  ) : (
                    <>
                      {hasRating && (
                        <Tooltip>
                          <AlertDialog>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <FormButton
                                  isPending={deleteIsPending}
                                  variant="destructive"
                                >
                                  <Trash />
                                </FormButton>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete rating?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button
                                    type="submit"
                                    form="ratingForm"
                                    formAction={deleteFormAction}
                                  >
                                    Continue
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <TooltipContent>Delete rating</TooltipContent>
                        </Tooltip>
                      )}
                      <ButtonWithTooltip
                        key="edit"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        tooltip={hasRating ? "Edit rating" : "Create rating"}
                      >
                        {hasRating ? <Edit /> : <Plus />}
                      </ButtonWithTooltip>
                    </>
                  )}
                </div>
              </FormLabel>

              {(isEditing || hasRating) && (
                <FormControl>
                  <Slider
                    {...field}
                    disabled={!isEditing || createIsPending}
                    min={0}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
              )}
              <FormMessage>{createState?.errors?.value}</FormMessage>
            </FormItem>
          )}
        />

        <FormMessage>{createState?.message}</FormMessage>
        <FormMessage>{deleteState?.message}</FormMessage>
      </NextForm>
    </Form>
  );
}

type RatingFormProps = {
  userId: number;
  artpieceId: number;
  currentRating?: number;
};
