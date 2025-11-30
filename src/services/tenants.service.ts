import { api } from "@/lib/apiHelpers";
import { CreateTenantDto } from "@/types/tenants.type";

export const createTenant = async (data: CreateTenantDto): Promise<any> => {
  return api.post("/tenant/create", data).then((res) => res.data);
};

export const getTenants = async (params: any): Promise<any> => {
  return api.get("/tenant", { params }).then((res) => res.data);
};
