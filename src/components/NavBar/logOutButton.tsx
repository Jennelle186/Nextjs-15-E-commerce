import { createClient } from "../../../utils/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

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
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account. You can log back in anytime
            to access your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={signOut}>
            <AlertDialogAction type="submit">Logout</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
