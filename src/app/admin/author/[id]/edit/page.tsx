import { redirect } from "next/navigation";
import { createClient } from "../../../../../../utils/supabase/server";
import { fetchAuthors } from "../../action";
import EditAuthorForm from "./editForm";

const AuthorEdit = async (props: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const params = await props.params;
  const id = params.id;

  const authors = await fetchAuthors(id);
  const authorData = authors ? authors[0] : null;

  return <EditAuthorForm author={authorData} />;
};

export default AuthorEdit;
