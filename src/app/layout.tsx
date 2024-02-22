import { Document } from "@/app/Document";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Movie Hero",
  applicationName: "Movie Hero",
  description: "Supoer Cool Movie Database",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Document>{children}</Document>;
}
