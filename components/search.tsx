"use client";

import { FC, useEffect, useState } from "react";
import { Input } from "./UI/input";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface SearchProps {
  className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      name: debouncedValue,
    };
    
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
      );

    router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className={cn("", className)}>
      <div className="bg-background/95 p-0 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* <form> */}
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Search by product name"
            className="pl-8 rounded-full"
          />
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};
