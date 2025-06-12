import { cn } from "@/shadcn/lib/utils";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";

export default function InfoEntry(props: InfoEntryProps) {
  if (React.isValidElement(props.content)) return props.content;

  const contents = Array.isArray(props.content)
    ? props.content
    : [props.content];

  const contentsWithOptionalHref =
    contents &&
    contents.map((content) =>
      content
        ? typeof content == "string"
          ? {
              content,
              href: undefined,
            }
          : {
              content: content.content as string,
              href: content.href as string,
            }
        : null,
    );

  return (
    <div className="text-wrap">
      {contentsWithOptionalHref.map((content, i) =>
        content ? (
          <Fragment key={i}>
            {content.href ? (
              <Link
                href={content.href}
                className={cn("hover:underline", props.className)}
              >
                {content.content}
              </Link>
            ) : (
              <span className={props.className}>{content.content}</span>
            )}
            {i < contentsWithOptionalHref.length - 1 ? ", " : ""}
          </Fragment>
        ) : (
          <span
            key={i}
            className={cn("text-muted-foreground", props.className)}
          >
            Unknown
          </span>
        ),
      )}
    </div>
  );
}

type InfoEntryProps = {
  content:
    | null
    | React.ReactElement
    | string
    | string[]
    | ContentWithHref
    | ContentWithHref[];
  className?: string;
};

type ContentWithHref = {
  content: string;
  href: string;
};
