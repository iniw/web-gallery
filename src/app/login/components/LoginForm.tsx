"use client";

import { Button } from "@/shadcn/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/form";
import { Input } from "@/shadcn/components/input";
import Link from "next/link";
import NextForm from "next/form";
import { useActionState } from "react";
import { Control, useForm } from "react-hook-form";
import login from "../actions/login";
import { LoginFormData } from "../lib/LoginFormSchema";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  const form = useForm<LoginFormData>();

  return (
    <Form {...form}>
      <NextForm className="flex flex-col gap-5" action={action}>
        <InputField
          control={form.control}
          name="username"
          label="Username"
          errors={state?.errors?.username}
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          errors={state?.errors?.password}
          type="password"
        />
        <Button type="submit">Sign In</Button>
        {state?.message && (
          <FormMessage className="text-center">{state.message}</FormMessage>
        )}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
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
  control: Control<LoginFormData>;
  name: keyof LoginFormData;
  label: string;
  placeholder?: string;
  errors?: string[];
  type?: string;
};
