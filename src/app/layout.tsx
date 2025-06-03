import ThemeProvider from "@/shadcn/components/theme-provider";
import Header from "./components/Header";
import "./globals.css";
import { getUser } from "./lib/auth/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="grid overscroll-none"
        style={{
          gridTemplateRows: "min-content 1fr",
        }}
      >
        {user ? (
          <Header
            userInfo={{
              state: "authed",
              username: user.username,
            }}
          />
        ) : (
          <Header
            userInfo={{
              state: "unauthed",
            }}
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="col-start-1 row-start-2 p-5">{children}</section>
        </ThemeProvider>
      </body>
    </html>
  );
}
