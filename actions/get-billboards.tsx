import { BillboardTypes } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getBillboards = async (): Promise<BillboardTypes[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getBillboards;