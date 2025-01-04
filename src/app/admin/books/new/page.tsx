import { redirect } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import BookForm from "./bookForm";
import { fetchAllAuthors } from "../../author/action";

const AddNewBook = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const data = (await fetchAllAuthors()) || [];

  const authors = data.map((author) => ({
    id: author.id,
    firstName: author.firstName,
    lastName: author.lastName,
    middleName: author.middleName,
  }));

  return <BookForm authors={authors} />;
};

export default AddNewBook;
