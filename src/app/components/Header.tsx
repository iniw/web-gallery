"use client";

import logout from "@/app/actions/logout";
import { Button } from "@/shadcn/components/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/dropdown-menu";
import { Input } from "@/shadcn/components/input";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";

export default function Header(props: HeaderProps) {
  return (
    <>
      <div className="col-span-full row-[1/span_2] h-screen" />
      <header className="sticky top-0 z-1000 col-start-1 row-start-1 flex items-center gap-8 border-b-2 bg-inherit p-5">
        <Link href="/" className="text-3xl font-bold">
          Web Gallery
        </Link>
        <Form action="/search">
          <Input
            name="query"
            autoComplete="off"
            className="min-w-80"
            placeholder="Search"
          />
        </Form>
        <div className="ml-auto flex items-center">
          <UserInfo {...props.userInfo} />
        </div>
      </header>
    </>
  );
}

function UserInfo(props: UserInfoProps) {
  switch (props.state) {
    case "unauthed":
      return (
        <Button variant="ghost" className="text-xl font-bold" asChild>
          <Link href="/login">Login</Link>
        </Button>
      );
    case "authed":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-xl font-bold">
              <Image
                src={`/app_user/avatar.jpg`}
                alt="Your avatar"
                width={25}
                height={25}
                className="aspect-square rounded-[50%]"
              />
              {props.username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-2000">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/user/${props.username}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}

type HeaderProps = {
  userInfo: UserInfoProps;
};

type UserInfoProps = Unauthed | Authed;

type Unauthed = {
  state: "unauthed";
};

type Authed = {
  state: "authed";
  username: string;
};
