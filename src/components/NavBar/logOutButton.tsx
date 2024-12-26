" user server";

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const signOut = async () => {
    try {
      const supabase = createClient();
      (await supabase).auth.signOut();
      redirect("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <form action={signOut}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default LogoutButton;
