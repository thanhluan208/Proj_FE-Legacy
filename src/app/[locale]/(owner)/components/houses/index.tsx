"use client";

import { Skeleton } from "@/components/ui";
import { useGetHouse } from "@/hooks/houses/useGetListHouse";
import { Link } from "@/i18n/routing";
import { Routes } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Home, Pencil, Plus } from "lucide-react";
import React from "react";
import AddHouseButton from "./AddHouseButton";

const SidebarHouseList = () => {
  const { data, isLoading } = useGetHouse();

  return (
    <div className="rounded-xl  items-center flex-col flex bg-neutral-100 overflow-hidden hover:shadow-sm transition-shadow">
      <div className="flex items-center relative text-neutral-400 justify-between group gap-2.5 w-full text-sm py-3.5 px-3 pl-6 hover:bg-neutral-90/60 hover:text-primary-60">
        <p className="text-sm ">House</p>
        <AddHouseButton />
      </div>

      {(!data || isLoading) &&
        [1, 2, 3].map((_, index) => {
          return (
            <div
              className={cn(
                "flex items-center relative justify-between group gap-2.5 w-full text-sm p-1 pl-8 hover:bg-neutral-90/60 hover:text-primary-60",
                index !== 0 && "border-t border-neutral-90/20"
              )}
            >
              <Skeleton className="h-10 w-full" />
            </div>
          );
        })}

      {data?.data &&
        !isLoading &&
        data?.data?.map((house, index) => {
          return (
            <Link
              href={`${Routes.HOUSE(house.id)}`}
              key={house.id}
              className={cn(
                "flex items-center relative justify-between group gap-2.5 w-full text-sm py-3.5 px-3 pl-8 hover:bg-neutral-90/60 hover:text-primary-60",
                index !== 0 && "border-t border-neutral-90/20"
              )}
            >
              <div className="flex items-center gap-2.5">
                {<Home className="w-4 h-4" />}
                <p>{house.name}</p>
              </div>

              <Pencil className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-60" />
            </Link>
          );
        })}
    </div>
  );
};

export default SidebarHouseList;
