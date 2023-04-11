import "./globals.css";

export const metadata = {
  title: "Top 100 Github Repos Browser",
  description: "Browse Top 100 Github Repos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
