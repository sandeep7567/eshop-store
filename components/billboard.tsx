import { BillboardTypes } from "@/types";
import { FC } from "react";

interface BillboardProps {
  data: BillboardTypes;
}

export const Billboard: FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${data?.imageUrl})`,
        }}
        className="rounded-xl bg-center bg-opacity-5 shadow-2xl shadow-card bg-cover bg-no-repeat relative aspect-square md:aspect-[2.4/1] overflow-hidden"
      >
        <div className="h-full w-full flex flex-col justify-center items-center gap-y-8 text-center">
          <div className="font-bold text-card/80 text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};
