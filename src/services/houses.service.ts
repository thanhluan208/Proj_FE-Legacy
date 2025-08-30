import { api } from "@/lib/apiHelpers";
import { queryStringify } from "@/lib/utils";
import { PaginationParams, PaginationResponse } from "@/types";
import { CreateHouseDTO, House } from "@/types/houses.type";

export const getHouses = async (
  payload?: PaginationParams
): Promise<PaginationResponse<House>> => {
  return api.get(`/houses?${queryStringify(payload)}`).then((res) => res.data);
};

export const createHouse = async (data: CreateHouseDTO): Promise<House> => {
  return api.post("/houses/create", data).then((res) => res.data);
};
