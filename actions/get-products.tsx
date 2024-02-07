import qs from "query-string";

import { ProductTypes } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface QueryTypes {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  priceId?: string;
  sortId?: string;
  isFeatured?: boolean;
  name?: string;
};

const getProducts = async (query: QueryTypes): Promise<ProductTypes[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      colorId: query.colorId,
      priceId: query.priceId,
      isFeatured: query.isFeatured,
      sortId: query.sortId,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
