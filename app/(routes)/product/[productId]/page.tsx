import { Container } from "@/components/UI/container";

import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import { ProductsList } from "@/components/products-list";
import Gallary from "@/components/gallary";
import { Info } from "@/components/info";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const productById = await getProduct(params?.productId);
  const suggestedProducts = await getProducts({
    categoryId: productById?.category?.id,
  });
  return (
    <div>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallary */}
            <Gallary images={productById?.images}/>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={productById}/>
            </div>
          </div>
          <hr className="my-10" />
          <ProductsList items={suggestedProducts} title="Suggested Products"/>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
