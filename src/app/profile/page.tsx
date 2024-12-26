import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import ProfileComponent from "./profileComponent";

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileComponent user={{ email: user?.email ?? "" }} />;
};

export default ProfilePage;
