import { ReactNode } from "react";
import { AdminLayout } from "@/features/admin/AdminLayout";

export default async function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
