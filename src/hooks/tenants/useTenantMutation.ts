import { QueryKeys } from "@/lib/constant";
import { createTenant } from "@/services/tenants.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const useTenantMutation = () => {
  const t = useTranslations("tenant");
  const queryClient = useQueryClient();

  const handleCreate = useMutation({
    mutationFn: createTenant,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.TENANT_LIST],
      });

      toast.success(t("messages.createSuccess"));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || t("messages.createError");
      toast.error(message);
    },
  });

  return { createTenant: handleCreate };
};

export default useTenantMutation;
