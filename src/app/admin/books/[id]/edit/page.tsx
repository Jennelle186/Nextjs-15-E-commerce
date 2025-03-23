// app/admin/books/[isbn]/edit/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "../../../../../../utils/supabase/server";
import { fetchAllBooks } from "../../action";
import EditBookComponent from "./EditBookComponent";

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

  // Fetch all authors.
  const { data: authors, error } = await supabase.from("authors").select("*");
  if (error) {
    console.error("Error fetching authors:", error);
  }

  return <EditBookComponent bookData={bookData} authors={authors || []} />;
};

export default BookEdit;
