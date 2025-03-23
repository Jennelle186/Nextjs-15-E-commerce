import { fetchAllBooks } from "./action";
import BrowseBooksComponent from "./browseBookComponent";

const Books = async () => {
  const books = (await fetchAllBooks()) || [];

  return <BrowseBooksComponent books={books} />;
};

export default Books;
