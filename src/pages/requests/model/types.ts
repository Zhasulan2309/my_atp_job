export type RequestStatus =
  | 'Новая'
  | 'В разнарядке'
  | 'Выполнена'
  | 'Отменена';

export type RequestPriority = 'Срочная' | 'Средняя' | 'Низкая';

export interface RequestItem {
  id: string;
  date: string;
  client: string;
  dept: string;
  vehicleType: string;
  status: RequestStatus;
  priority: RequestPriority;
  timeFrom: string;
  timeTo: string;
}