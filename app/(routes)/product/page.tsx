import { Container } from "@/components/UI/container";
import { Billboard } from "@/components/billboard";
import React from "react";
import MobileFilters from "../category/[categoryId]/_components/mobile-filters";
import { Fillter } from "../category/[categoryId]/_components/fillter";
import { NotFound } from "@/components/UI/not-found";
import { ProductCard } from "@/components/UI/product-card";
import { Sorting } from "@/components/sorting";
import { Search } from "@/components/search";

import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getPrices from "@/actions/get-prices";

import { sortingProducts } from "@/data/sorting-data";
import getBillboards from "@/actions/get-billboards";
import { getRandomBillboard } from "@/hooks/use-random-billboards";

export const revalidate = 0;

const AllProductsPage = async ({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: {
    colorId: string;
    sizeId: string;
    priceId: string;
    sortId: string;
    name: string;
  };
  
}) => {
  if (!searchParams) {
    return null;
  }

  const { colorId, sizeId, priceId, sortId, name } = searchParams;
  const billboards = await getBillboards();
  const billboardsIds = billboards.map((item) => item?.id);

  const randomBillboardId = getRandomBillboard(billboardsIds.length, billboardsIds) || "65ae23167293c6d493c46bcb";
  const billboard = await getBillboard(randomBillboardId);

  const products = await getProducts({
    colorId,
    sizeId,
    priceId,
    sortId,
    name,
  });

  const colors = await getColors();
  const sizes = await getSizes();
  const prices = await getPrices();

  return (
    <div className="bg-card">
      <Container>
        <Billboard data={billboard} />
        <div className="px-4 sm:px-6 lg:px-8 py-16 lg:flex lg:flex-col lg:gap-y-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 ">
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
              <Fillter
                valueKey={"priceId"}
                name={"Price Range"}
                data={prices}
              />
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

export default AllProductsPage;
