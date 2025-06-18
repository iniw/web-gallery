import { cn } from "@/shadcn/lib/utils";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";

export default function InfoEntry(props: InfoEntryProps) {
  if (React.isValidElement(props.content)) return props.content;

  const contents =
    props.content &&
    (Array.isArray(props.content) ? props.content : [props.content]);

  const contentsWithOptionalHref =
    contents &&
    contents.map((content) =>
      typeof content == "string"
        ? {
            content,
            href: undefined,
          }
        : {
            content: content.content as string,
            href: content.href as string,
          },
    );

  return (
    <div className="text-wrap">
      {contentsWithOptionalHref ? (
        contentsWithOptionalHref.map((content, i) => (
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
            <span className={props.className}>
              {i < contentsWithOptionalHref.length - 1 ? ", " : ""}
            </span>
          </Fragment>
        ))
      ) : (
        <span className={cn("text-muted-foreground", props.className)}>
          Unknown
        </span>
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
