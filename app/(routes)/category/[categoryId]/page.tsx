import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import { Container } from "@/components/UI/container";
import { Billboard } from "@/components/billboard";
import { CategoryTypes } from "@/types";
import { FC } from "react";
import { Fillter } from "./_components/fillter";
import { NotFound } from "@/components/UI/not-found";
import { ProductCard } from "@/components/UI/product-card";
import MobileFilters from "./_components/mobile-filters";
import getPrices from "@/actions/get-prices";
import { sortingProducts } from "@/data/sorting-data";
import { Sorting } from "@/components/sorting";
import { Search } from "@/components/search";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
    priceId: string;
    sortId: string;
    name: string;
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  if (!searchParams) {
    return null;
  }

  const { colorId, sizeId, priceId, sortId, name } = searchParams;
  const { categoryId } = params;

  const products = await getProducts({
    categoryId,
    colorId,
    sizeId,
    priceId,
    sortId,
    name,
  });

  // api call for products data by query appljy through button click like categoryId, sizeId, colorId,
  const colors = await getColors();
  const sizes = await getSizes();
  const category = await getCategory(categoryId);
  const prices = await getPrices();

  // api call for billboard data
  const billboard = await getBillboard(category?.billboardId);

  const billboardData = category?.billboard ? category?.billboard : billboard;

  return (
    <div className="bg-card">
      <Container>
        <Billboard data={billboardData} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Add Mobile Filters */}
            <MobileFilters colors={colors} sizes={sizes} prices={prices} sortingData={sortingProducts} />
            <div className="hidden lg:block">
              <Search className="mb-8 shadow shadow-card" />
              <Sorting
                valueKey={"sortId"}
                label={"Sort by:"}
                data={sortingProducts}
              />
              <Fillter valueKey={"sizeId"} name={"Sizes"} data={sizes} />
              <Fillter valueKey={"colorId"} name={"Colors"} data={colors} />
              <Fillter valueKey={"priceId"} name={"Price Range"} data={prices} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NotFound />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard data={item} key={item?.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
