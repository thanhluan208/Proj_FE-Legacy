export interface House {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHouseDTO {
  name: string;
  description?: string;
}