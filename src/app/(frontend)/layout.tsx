import { Analytics } from "@vercel/analytics/next";
import React from "react";

import "../globals.css";

export const metadata = {
  description: "A Portfolio website using Payload in a Next.js app.",
  title: "abelhii",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
