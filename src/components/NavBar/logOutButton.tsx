import { createClient } from "../../../utils/supabase/client";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const signOut = async () => {
    try {
      console.log("clicked. signing out");
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      // redirect("/login");
      window.location.reload(); // Refresh the page after redirecting
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message ?? "An unexpected error occurred",
      });
    }
  };

  return (
    <form action={signOut}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default LogoutButton;
