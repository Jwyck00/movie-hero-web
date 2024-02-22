import { redirect } from "next/navigation";
import { DASHBOARD_PATH } from "@/features/dashboard/constants";

export default function Page() {
  redirect(DASHBOARD_PATH || "/");
}
