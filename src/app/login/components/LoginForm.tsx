"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import login from "../actions/login";
import { useActionState } from "react";
import { Control, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LoginData } from "../lib/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  const form = useForm<LoginData>();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" action={action}>
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
      </form>
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

interface InputFieldProps {
  control: Control<LoginData>;
  name: keyof LoginData;
  label: string;
  placeholder?: string;
  errors?: string[];
  type?: string;
}
