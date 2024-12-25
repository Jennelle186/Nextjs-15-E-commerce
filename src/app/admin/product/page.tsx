import BackButton from "@/components/backButton";
import ProductComponent from "./productComponent";

const ProductPage = () => {
  return (
    <div>
      <BackButton text="Go Back" link="/admin" />
      <ProductComponent />
    </div>
  );
};

export default ProductPage;
