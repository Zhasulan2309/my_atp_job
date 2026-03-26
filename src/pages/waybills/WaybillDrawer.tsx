import { Descriptions, Drawer, Tag, Typography } from 'antd';
import type { Waybill } from './model/types';

interface Props {
  open: boolean;
  onClose: () => void;
  waybill: Waybill | null;
}

export const WaybillDrawer = ({ open, onClose, waybill }: Props) => {
  const getStatusColor = (status?: Waybill['status']) => {
    switch (status) {
      case 'Открыт':
        return 'success';
      case 'Обработан':
        return 'processing';
      case 'Закрыт':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Drawer
      title={waybill ? `Путевой лист ${waybill.id}` : 'Путевой лист'}
      placement="right"
      open={open}
      onClose={onClose}
      width={720}
    >
      {waybill ? (
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="№ ПЛ">{waybill.id}</Descriptions.Item>
          <Descriptions.Item label="Дата">{waybill.date}</Descriptions.Item>
          <Descriptions.Item label="Автомобиль">{waybill.vehicle}</Descriptions.Item>
          <Descriptions.Item label="Водитель">{waybill.driver}</Descriptions.Item>
          <Descriptions.Item label="Маршрут">{waybill.route}</Descriptions.Item>
          <Descriptions.Item label="Спидометр нач.">
            {waybill.odoStart.toLocaleString('ru-RU')}
          </Descriptions.Item>
          <Descriptions.Item label="Спидометр кон.">
            {waybill.odoEnd ? waybill.odoEnd.toLocaleString('ru-RU') : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="ГСМ нач.">{waybill.fuelStart} л</Descriptions.Item>
          <Descriptions.Item label="ГСМ кон.">
            {waybill.fuelEnd ? `${waybill.fuelEnd} л` : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={getStatusColor(waybill.status)}>{waybill.status}</Tag>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Typography.Text type="secondary">Данные не выбраны</Typography.Text>
      )}
    </Drawer>
  );
};