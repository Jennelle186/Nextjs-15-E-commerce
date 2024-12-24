import BackButton from "@/components/backButton";
import CategoryComponent from "./categoryForm";

const Category = () => {
  return (
    <div>
      <BackButton text="Go Back" link="/admin" />
      <CategoryComponent />
    </div>
  );
};

export default Category;
