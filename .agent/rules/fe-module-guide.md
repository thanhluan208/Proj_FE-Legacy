---
trigger: always_on
glob:
description:
---

# Data Fetching Hooks

When creating a new hook to fetch data from the backend, follow this pattern:

1.  **Naming Convention**: The hook name should start with `use` and describe the data being fetched (e.g., `useGetHouse`).
2.  **Imports**:
    - Import `useQuery` from `@tanstack/react-query`.
    - Import `QueryKeys` from `@/lib/constant`.
    - Import the appropriate Service class from `@/services`.
    - Import necessary types from `@/types`.
3.  **Structure**:
    - The hook should accept a parameters object (e.g., `PaginationParams`) if needed.
    - Define default values for parameters (e.g., `pageSize = 10`, `page = 1`).
4.  **Query Configuration**:
    - Use `useQuery` to fetch data.
    - **queryKey**: Must be an array that includes a specific key from `QueryKeys` and any parameters that affect the query (e.g., `[QueryKeys.HOUSE_LIST, pageSize, page]`).
    - **queryFn**: An arrow function that calls the service method with the parameters.
    - **enabled**: (Optional) A boolean expression to control when the query should run (e.g., `!!profile?.email`).

**Example:**

```typescript
import { QueryKeys } from "@/lib/constant";
import { HousesService } from "@/services";
import { PaginationParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetHouse = (params?: PaginationParams) => {
  const pageSize = params?.pageSize || 10;
  const page = params?.page || 1;

  return useQuery({
    queryKey: [QueryKeys.HOUSE_LIST, pageSize, page],
    queryFn: () => HousesService.getHouses({ pageSize, page }),
  });
};
```

# Mutation Hooks

All mutate actions of a module will be declared inside a single hook file (e.g., `useHouseMutation.ts`).

1.  **Naming Convention**: The hook name should be `use[Module]Mutation` (e.g., `useHouseMutation`).
2.  **Imports**:
    - Import `useMutation`, `useQueryClient` from `@tanstack/react-query`.
    - Import `useTranslations` from `next-intl`.
    - Import `toast` from `react-hot-toast`.
    - Import `QueryKeys` from `@/lib/constant`.
    - Import the appropriate Service class from `@/services`.
3.  **Structure**:
    - Initialize `translation` and `queryClient`.
    - Define mutation handlers using `useMutation`.
4.  **Mutation Configuration**:
    - `mutationFn`: Service method to call.
    - `onSuccess`:
        - Invalidate relevant queries using `queryClient.invalidateQueries`.
        - Show success toast.
    - `onError`:
        - Extract error message from response or use default.
        - Show error toast.
5.  **Return**: Object containing the mutation handlers (e.g., `{ createHouse: handleCreate }`).

**Example:**

```typescript
import { QueryKeys } from "@/lib/constant";
import { HousesService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const useHouseMutation = () => {
  const translation = useTranslations("property");
  const queryClient = useQueryClient();

  const handleCreate = useMutation({
    mutationFn: HousesService.createHouse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.HOUSE_LIST],
      });

      toast.success(translation("messages.houseAddedSuccess"));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || translation("messages.houseAddedError");
      toast.error(message);
    },
  });

  return { createHouse: handleCreate };
};

export default useHouseMutation;
```
