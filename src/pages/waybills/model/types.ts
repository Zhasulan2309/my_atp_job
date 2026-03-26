export type WaybillStatus = 'Открыт' | 'Обработан' | 'Закрыт';

export type Waybill = {
  id: string;
  date: string;
  vehicle: string;
  driver: string;
  route: string;
  odoStart: number;
  odoEnd?: number;
  fuelStart: number;
  fuelEnd?: number;
  status: WaybillStatus;
};