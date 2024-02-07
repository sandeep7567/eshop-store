import { ProductTypes } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface QueryTypes {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProduct = async (id: string): Promise<ProductTypes> => {

  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
