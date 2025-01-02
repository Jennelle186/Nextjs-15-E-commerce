import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import ProfileComponent from "./profileComponent";
import { error } from "console";

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profileData, error: profileError } = await (
    await supabase
  )
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    // Use the user's ID to fetch their profile
    .single();
  // We expect only one profile

  if (profileError) {
    console.log(error, " error in the profile page");
  }

  console.log(profileData, "profileData");

  return <ProfileComponent user={profileData} />;
};

export default ProfilePage;
