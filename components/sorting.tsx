"use client";

import { SortTypes } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FC } from "react";

interface SortingProps {
  label: string;
  valueKey: string;
  data: SortTypes[];
}

export const Sorting: FC<SortingProps> = ({ data, label, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{label}</h3>
      <hr className="my-4" />
      <select
        onChange={(ev) => onChange(ev.target.value)}
        className="block w-fit p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {data.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
