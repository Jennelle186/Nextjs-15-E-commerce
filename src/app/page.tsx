import FeaturedBooks from "@/components/featuredBooks";
import BookshopFeatures from "@/components/featureShop";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedBooks />
      <BookshopFeatures />
      <Footer />
    </div>
  );
}
