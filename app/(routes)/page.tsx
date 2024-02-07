import getBillboard from "@/actions/get-billboard";
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import { Container } from "@/components/UI/container";
import { Billboard } from "@/components/billboard";
import { ProductsList } from "@/components/products-list";
import { getRandomBillboard } from "@/hooks/use-random-billboards";
import React from "react";

export const revalidate = 0;

interface HomePageProps {
  params: {
    // categoryId: string;
  };
  searchParams: {
    // colorId: string;
    // sizeId: string;
    // priceId: string;
    // sortId: string;
    name: string;
  };
}

const HomePage: React.FC<HomePageProps> = async ({
  params,
  searchParams,
}) => {
  const { name } = searchParams;

  const products = await getProducts({ isFeatured: true, name: name  });
  const billboards = await getBillboards();
  const billboardsIds = billboards.map((item) => item?.id);

  const randomBillboardId = getRandomBillboard(billboardsIds.length, billboardsIds) || "65aa804f24bdf0b8e96bdb24";
  const billboard = await getBillboard(randomBillboardId);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:pc-8">
          <ProductsList title="Featred Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;