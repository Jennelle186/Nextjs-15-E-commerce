import LandingPage from "@/components/landingPage";
import { fetchAllBooks } from "./books/action";

export default async function Home() {
  const books = (await fetchAllBooks()) || [];
  return <LandingPage books={books} />;
}
