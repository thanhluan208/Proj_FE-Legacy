import { PaginationParams } from ".";

export interface Room {
  id: string;
  name: string;
  house: string;
  description?: string;
  size_sq_m: number;
  base_rent: number;
  price_per_electricity_unit?: number;
  price_per_water_unit?: number;
  fixed_water_fee?: number;
  fixed_electricity_fee?: number;
  living_fee?: number;
  parking_fee?: number;
  cleaning_fee?: number;
  createdAt: Date;
  updatedAt: Date;
  paymentDate?: Date;
  status?: {
    id: number;
    name: string;
    color: string;
  };
}

export interface CreateRoomDto {
  name: string;
  house: string;
  description?: string;
  size_sq_m: number;
  base_rent: number;
  price_per_electricity_unit?: number;
  price_per_water_unit?: number;
  fixed_water_fee?: number;
  fixed_electricity_fee?: number;
  living_fee?: number;
  parking_fee?: number;
  cleaning_fee?: number;
}


export interface GetRoomByHouse extends PaginationParams {
  house: string
}