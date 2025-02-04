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

    //check if user is an admin
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session?.user.id)
      // Use the user's ID to fetch their profile
      .single();
    // We expect only one profile

    let isAdmin = false;
    //check if user is an admin
    if (profileData && profileData?.role === 2) {
      // User is an admin, set isAdmin to true
      isAdmin = true;
    } else {
      // User is not an admin, redirect or show an error
      console.error("User is not an admin");
    }

    // If the user is an admin, don't show the Navbar at all
    if (isAdmin) {
      return null;
    }

    return <Navbar session={session} />;
  } catch (error) {
    console.error("Error in the navbar wrapper:", error);
    return <Navbar session={null} />;
  }
}
