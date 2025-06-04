"use client";

import { User } from "@/app/lib/auth/user";
import { Input } from "@/shadcn/components/input";
import Form from "next/form";

export default function Control(_props: ControlProps) {
  return (
    <Form action={() => {}}>
      <Input
        placeholder="Leave your rating"
        type="number"
        max={10}
        min={0}
      ></Input>
    </Form>
  );
}

type ControlProps = {
  user?: User;
  artpieceId: number;
};
