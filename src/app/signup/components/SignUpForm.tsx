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
import { useActionState } from "react";
import { Control, useForm } from "react-hook-form";
import signup from "../actions/signup";
import { SignupData } from "../lib/schema";

export default function SignupForm() {
  const [state, action] = useActionState(signup, null);

  const form = useForm<SignupData>();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" action={action}>
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
          errors={state?.errors?.password}
        />
        <Button type="submit">Register</Button>
        {state?.message && (
          <FormMessage className="text-center">{state.message}</FormMessage>
        )}
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

interface InputFieldProps {
  control: Control<SignupData>;
  name: keyof SignupData;
  label: string;
  description: string;
  placeholder?: string;
  errors?: string[];
  type?: string;
}
