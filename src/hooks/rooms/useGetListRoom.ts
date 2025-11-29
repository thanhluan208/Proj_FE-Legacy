import { QueryKeys } from "@/lib/constant";
import { RoomsService } from "@/services";
import { PaginationParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetListRoom = (params?: PaginationParams) => {
  const pageSize = params?.pageSize || 10;
  const page = params?.page || 1;

  return useQuery({
    queryKey: [QueryKeys.ROOM_LIST, pageSize, page],
    queryFn: () => RoomsService.getRooms({ pageSize, page }),
  });
};
