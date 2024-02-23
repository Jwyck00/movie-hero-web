import { DASHBOARD_PATH } from "@/features/dashboard/constants";
import { MOVIES_PATH } from "@/features/movies/constants";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(MOVIES_PATH || DASHBOARD_PATH || "/");
}
