import { redirect } from "next/navigation";
import LandingPage from "@/components/landingPage";
import { fetchAllBooks } from "./books/action";
import { createClient } from "../../utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (user) {
    const { data: profile } = await (await supabase)
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === 2) {
      redirect("/admin"); // ⬅️ redirect admin to /admin
    }
  }

  const books = (await fetchAllBooks()) || [];

  return <LandingPage books={books} />;
}
