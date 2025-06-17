import { redirect } from "next/navigation";

export default async function GlobalNotFound() {
  redirect("/not-found");
}
