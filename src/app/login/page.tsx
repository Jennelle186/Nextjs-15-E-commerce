import { createClient } from "../../../utils/supabase/server";
import LoginComponent from "./loginComponent";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.getUser();

  //if user is logged in, redirect to the homepage
  if (data.user) {
    redirect("/");
  }

  if (error) {
    console.error(error);
  }

  // Render login component for users who are not logged in
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
