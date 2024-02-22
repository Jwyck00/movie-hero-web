"use client";

import { ReactNode } from "react";
import { Providers } from "@/app/Providers";
import { Viewport } from "@/components/Viewport";
import theme from "@/theme";

export const Document = ({ children }: { children: ReactNode }) => {

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content={theme.colors.gray?.["800"]} />
      </head>
      <body>
        <Providers>
          <Viewport>{children}</Viewport>
        </Providers>
      </body>
    </html>
  );
};
