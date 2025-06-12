"use client";

import { Button } from "@/shadcn/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/form";
import { Input } from "@/shadcn/components/input";
import NextForm from "next/form";
import { ComponentProps, useActionState } from "react";
import { Control, useForm } from "react-hook-form";
import signup from "../actions/signup";
import { SignupFormData } from "../lib/SignUpFormSchema";

export default function SignupForm() {
  const [state, action] = useActionState(signup, null);

  const form = useForm<SignupFormData>();

  return (
    <Form {...form}>
      <NextForm className="flex flex-col gap-5" action={action}>
        <InputField
          control={form.control}
          name="username"
          label="Username"
          description="The unique identifier of your account"
          errors={state?.errors?.username}
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          description="The password of your account"
          type="password"
          autoComplete="off"
          errors={state?.errors?.password}
        />
        <Button type="submit">Register</Button>
        {state?.message && (
          <FormMessage className="text-center">{state.message}</FormMessage>
        )}
      </NextForm>
    </Form>
  );
}

function InputField(props: InputFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormDescription>{props.description}</FormDescription>
          <FormControl>
            <Input
              type={props.type}
              placeholder={props.placeholder}
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage>
            {props.errors && (
              <div>
                <p>{props.label} must:</p>
                <ul>
                  {props.errors.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );
}

type InputFieldProps = {
  control: Control<SignupFormData>;
  name: keyof SignupFormData;
  label: string;
  description: string;
  placeholder?: string;
  errors?: string[];
  type?: string;
} & ComponentProps<typeof Input>;
