"use client";

import { useGetListTenant } from "@/hooks/tenants/useGetListTenant";
import type { GetTenantParams } from "@/types/tenants.type";
import { isArray, isEmpty } from "lodash";
import { ChevronsUpDown, Search, X } from "lucide-react";
import { type FC, useCallback, useMemo, useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SpinIcon } from "../icons";

export type SelectedTenant = {
  id: string;
  name: string;
};

interface ComboBoxTenantProps {
  placeholder?: string;

  defaultValue?: SelectedTenant | SelectedTenant[];
  value?: SelectedTenant | SelectedTenant[];
  isMultiple?: boolean;

  roomId: string;

  handleSelect: (value: SelectedTenant) => void;
  handleRemove: (value: string) => void;
}

const ComboBoxTenant: FC<ComboBoxTenantProps> = ({
  placeholder = "combobox.tenantPlaceholder",
  defaultValue,
  value,
  isMultiple,
  roomId,

  handleSelect,
  handleRemove,
}) => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<GetTenantParams>({
    room: roomId,
    page: 1,
    pageSize: 10,
    search: "",
    status: "active",
  });

  const { data, isFetching } = useGetListTenant(filter);

  const tenantList = data?.data || [];

  const selected = useMemo(() => {
    if (isMultiple) {
      if (!isEmpty(value)) return value;
      if (!isEmpty(defaultValue)) return defaultValue;
    } else {
      if (value) return value;
      if (defaultValue) return value;
    }
  }, [value, defaultValue, isMultiple]);

  const handleChangeSearch = (value: string) => setSearch(value);

  const renderButtonContent = useCallback(() => {
    if (!selected) return placeholder;
    if (isMultiple && isArray(selected)) {
      return (
        <>
          {selected.map((elm) => {
            return (
              <div
                key={elm.id}
                className="px-3 py-1 rounded-md shadow-md bg-primary text-xs relative pr-4 hover:shadow-xl"
              >
                {elm.name}
                <X
                  onClick={() => handleRemove(elm.id)}
                  className="absolute top-2/4 -translate-y-2/4 right-2 h-3.5 w-3.5 cursor-pointer"
                />
              </div>
            );
          })}
        </>
      );
    }

    if (!isMultiple && !isArray(selected)) {
      return (
        <div className="flex justify-between pr-3">
          <p className="text-sm">{selected.name}</p>
          <X
            onClick={() => handleRemove(selected.id)}
            className="w-3.5 h-3.5 cursor-pointer"
          />
        </div>
      );
    }

    return placeholder;
  }, [selected, isMultiple, placeholder, handleRemove]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[350px] justify-between bg-transparent"
        >
          {renderButtonContent()}
          {isFetching ? (
            <SpinIcon />
          ) : (
            <ChevronsUpDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] p-0 z-[1300]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              autoFocus
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search framework..."
              value={search}
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            {tenantList.length === 0 && (
              <div className="py-6 text-center text-sm">
                No framework found.
              </div>
            )}
            <div className="overflow-hidden p-1 text-foreground">
              {tenantList.map((elm) => (
                <div
                  key={elm.id}
                  onClick={() => {
                    handleSelect({
                      id: elm.id,
                      name: elm.name,
                    });
                    setOpen(false);
                  }}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                >
                  <div className="flex justify-between items-center w-full">
                    <p>{elm.name}</p>
                    <p className="text-xs opacity-50">{elm.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBoxTenant;
