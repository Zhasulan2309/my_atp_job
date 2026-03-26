export type VehicleStatus =
  | "В работе"
  | "В ремонте"
  | "Консервация"
  | "На списании";

export interface Vehicle {
  id: number;
  garageNo: string;
  stateNo: string;
  model: string;
  type: string;
  status: VehicleStatus;
  driver: string;
  park: string;
  mileage: number;
  nextTO: string;
}
