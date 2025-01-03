import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import AuthorListComponent from "./authroListComponent";
import { Author } from "../../../../types/product";

const AuthorList = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("authors")
    .select("id,firstName,lastName,middleName");

  if (error) {
    console.error(error, " error in the author list page");
    return <div>Error retrieving authors</div>;
  }
  const authors = data.map((author) => ({
    id: author.id,
    first_name: author.firstName,
    last_name: author.lastName,
    middle_name: author.middleName,
  }));

  return <AuthorListComponent authors={authors as Author[]} />;
};

export default AuthorList;
