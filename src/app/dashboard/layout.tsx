import { ReactNode } from "react";
import { DashboardLayout } from "@/features/dashboard/DashboardLayout";

export default async function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
