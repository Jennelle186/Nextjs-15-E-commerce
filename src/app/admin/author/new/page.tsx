import BackButton from "@/components/backButton";
import AuthorForm from "./authorForm";
import { createClient } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";

const AuthorPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <BackButton text="Go Back" link="/admin/author" />
      Author Page New
      <AuthorForm />
    </div>
  );
};

export default AuthorPage;
