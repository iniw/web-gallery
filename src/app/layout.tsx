import ThemeProvider from "@/components/theme-provider";
import Header from "./components/Header";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="grid overscroll-none"
        style={{
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <Header />
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
