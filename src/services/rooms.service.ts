import { api } from "@/lib/apiHelpers";
import { PaginationParams, PaginationResponse } from "@/types";
import { CreateRoomDto, Room } from "@/types/rooms.type";

export const getRooms = async (
  payload?: PaginationParams
): Promise<PaginationResponse<Room>> => {
  return api.get(`/rooms?`).then((res) => res.data);
};

export const createRoom = async (data: CreateRoomDto): Promise<Room> => {
  return api.post("/rooms/create", data).then((res) => res.data);
};
