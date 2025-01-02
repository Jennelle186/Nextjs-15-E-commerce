import { createClient } from "../../../utils/supabase/server";
import Navbar from "./navbar";

export default async function NavbarWrapper() {
  const supabase = await createClient();

  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getUser();

    if (sessionError || !session) {
      return <Navbar session={null} />;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      console.log("Error fetching user profile:", profileError);
      return <Navbar session={null} />;
    }

    console.log("NavbarWrapper session:", profileData);

    // Only show the Navbar if the user's role is not 'admin'
    if (profileData?.role == "user") {
      return <Navbar session={session} />;
    } else {
      return null; // Do not render the Navbar if the user is an admin
    }
  } catch (error) {
    console.error("Error in the navbar wrapper:", error);
    return <Navbar session={null} />;
  }
}
