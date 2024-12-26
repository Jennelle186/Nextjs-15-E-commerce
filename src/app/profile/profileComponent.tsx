import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  user: {
    email: string;
  };
}

const ProfileComponent = ({ user }: ProfileProps) => {
  const signOut = async () => {
    "use server";
    try {
      const supabase = createClient();
      await (await supabase).auth.signOut();
      redirect("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, {JSON.stringify(user)}</h1>
      {/* Other profile details */}
      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default ProfileComponent;
