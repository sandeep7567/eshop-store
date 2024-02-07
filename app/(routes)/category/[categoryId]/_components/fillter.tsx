"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { ColorTypes, SizeTypes } from "@/types";
import { cn } from "@/lib/utils";

import Button from "@/components/UI/button";

interface FillterProps {
  data: (SizeTypes | ColorTypes)[];
  name: string;
  valueKey: string;
}

export const Fillter: FC<FillterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams?.get(valueKey);

  const onClick = (id: string) => {
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
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data?.map((filter) => (
          <div key={filter?.id} className="flex items-center">
            {!name.includes("Colors") && (
              <Button
                className={cn(
                  "rounded-md bg-card border border-border text-sm text-muted-foreground",
                  selectedValue === filter?.id &&
                    "bg-primary text-primary-foreground"
                )}
                onClick={() => onClick(filter?.id)}
              >
                {filter?.name}
              </Button>
            )}
            {/* color button */}
            {name.includes("Colors") && (
              <Button
                className={cn(
                  `rounded-md border opacity-60 border-border text-sm text-muted-foreground`,
                  selectedValue === filter?.id &&
                    "bg-primary text-primary opacity-100 border border-black border-opacity-40"
                )}
                style={{ backgroundColor: `${filter?.value}` }}
                onClick={() => onClick(filter?.id)}
              >
                {filter?.name}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
