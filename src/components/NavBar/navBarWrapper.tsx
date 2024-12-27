import { createClient } from "../../../utils/supabase/server";
import Navbar from "./navbar";

export default async function NavbarWrapper() {
  const supabase = await createClient();

  try {
    const { data: session, error } = await supabase.auth.getUser();

    if (error) {
      return <Navbar session={null} />;
    }

    return <Navbar session={session} />;
  } catch (error) {
    console.error("Error in the navbar wrapper:", error);
    return <Navbar session={null} />;
  }
}
