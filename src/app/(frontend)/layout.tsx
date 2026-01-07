import { Analytics } from "@vercel/analytics/next";
import React from "react";

import { Nav, NavItem } from "@/components/Nav";
import "../globals.css";
import Providers from "./providers";

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
        <Providers>
          <main>
            <Nav className="absolute m-8 top-0 z-10">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/projects">Projects</NavItem>
            </Nav>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
