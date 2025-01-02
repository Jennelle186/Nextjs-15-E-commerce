import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";

const AuthorList = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return <div>Author list</div>;
};

export default AuthorList;
