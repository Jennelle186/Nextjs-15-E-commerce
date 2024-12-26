import { createClient } from "../../../utils/supabase/server";
import LoginComponent from "./loginComponent";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (user) {
    redirect("/");
  }

  // Render login component for users who are not logged in
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
