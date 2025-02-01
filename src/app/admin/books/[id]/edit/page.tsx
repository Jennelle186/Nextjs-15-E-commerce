// app/admin/books/[isbn]/edit/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "../../../../../../utils/supabase/server";
import { fetchAllBooks } from "../../action";

const BookEdit = async (props: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const params = await props.params;
  const id = params.id;

  const books = await fetchAllBooks(id);
  const bookData = books ? books[0] : null;

  return <h1>Edit Book {JSON.stringify(bookData, null, 2)}</h1>;
};

export default BookEdit;
