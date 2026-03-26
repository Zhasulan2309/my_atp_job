import { useMemo, useState } from 'react';
import { Button, Card, Segmented, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

import { VehicleCreateDrawer } from './VehicleCreateDrawer';
import { VehicleDrawer } from './VehicleDrawer';
import type { Vehicle } from './model/types'

type FilterKey = 'all' | 'work' | 'repair' | 'other';

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    garageNo: '001',
    stateNo: '150 ABA 02',
    model: 'КАМАЗ 65115',
    type: 'Самосвал',
    status: 'В работе',
    driver: 'Иванов А.С.',
    park: 'А/Х Таукент',
    mileage: 145280,
    nextTO: 'ТО-2 через 1200 км',
  },
  {
    id: 2,
    garageNo: '002',
    stateNo: '320 BCA 02',
    model: 'MAN TGA 18.480',
    type: 'Седельный тягач',
    status: 'В работе',
    driver: 'Петров Б.В.',
    park: 'А/Х Таукент',
    mileage: 312400,
    nextTO: 'ТО-1 через 3400 км',
  },
  {
    id: 3,
    garageNo: '003',
    stateNo: '780 DDA 02',
    model: 'Toyota Hilux',
    type: 'Легковой ТС',
    status: 'В ремонте',
    driver: 'Сидоров К.М.',
    park: 'А/Х Шиели',
    mileage: 89200,
    nextTO: 'ТО-1 просрочен',
  },
  {
    id: 4,
    garageNo: '004',
    stateNo: '441 EEA 02',
    model: 'HOWO ZZ4257',
    type: 'Седельный тягач',
    status: 'В работе',
    driver: 'Нурланов Д.Е.',
    park: 'Кыземшек',
    mileage: 201300,
    nextTO: 'ТО-3 через 800 км',
  },
  {
    id: 5,
    garageNo: '005',
    stateNo: '592 FFA 02',
    model: 'Hyundai HD78',
    type: 'Бортовой ТС',
    status: 'Консервация',
    driver: '—',
    park: 'Оңтүстік',
    mileage: 56700,
    nextTO: '—',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'В работе':
      return 'success';
    case 'В ремонте':
      return 'warning';
    case 'Консервация':
      return 'default';
    case 'На списании':
      return 'error';
    default:
      return 'default';
  }
};

export const VehiclesPage = () => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const filteredVehicles = useMemo(() => {
    switch (filter) {
      case 'work':
        return vehicles.filter((item) => item.status === 'В работе');
      case 'repair':
        return vehicles.filter((item) => item.status === 'В ремонте');
      case 'other':
        return vehicles.filter(
          (item) =>
            item.status === 'Консервация' || item.status === 'На списании',
        );
      default:
        return vehicles;
    }
  }, [filter, vehicles]);

  const handleRowOpen = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewDrawerOpen(true);
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: 'ГАР. №',
      dataIndex: 'garageNo',
      key: 'garageNo',
      width: 90,
    },
    {
      title: 'ГОС. НОМЕР',
      dataIndex: 'stateNo',
      key: 'stateNo',
      render: (value) => (
        <Typography.Text strong style={{ fontFamily: 'monospace' }}>
          {value}
        </Typography.Text>
      ),
      width: 150,
    },
    {
      title: 'МОДЕЛЬ',
      dataIndex: 'model',
      key: 'model',
      width: 180,
    },
    {
      title: 'ТИП',
      dataIndex: 'type',
      key: 'type',
      width: 180,
    },
    {
      title: 'СТАТУС',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={getStatusColor(value)}>{value}</Tag>,
      width: 150,
    },
    {
      title: 'ВОДИТЕЛЬ',
      dataIndex: 'driver',
      key: 'driver',
      width: 180,
    },
    {
      title: 'АВТОПАРК',
      dataIndex: 'park',
      key: 'park',
      width: 160,
    },
    {
      title: 'ПРОБЕГ',
      dataIndex: 'mileage',
      key: 'mileage',
      render: (value) => `${value.toLocaleString('ru-RU')} км`,
      width: 140,
    },
    {
      title: 'СЛЕД. ТО',
      dataIndex: 'nextTO',
      key: 'nextTO',
      render: (value: string) => (
        <Typography.Text type={value.includes('просрочен') ? 'danger' : undefined}>
          {value}
        </Typography.Text>
      ),
      width: 180,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Segmented<FilterKey>
            value={filter}
            onChange={(value) => setFilter(value)}
            options={[
              { label: 'Все', value: 'all' },
              { label: 'В работе', value: 'work' },
              { label: 'В ремонте', value: 'repair' },
              { label: 'Прочие', value: 'other' },
            ]}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateDrawerOpen(true)}
          >
            Добавить ТС
          </Button>
        </div>

        <Card>
          <Table<Vehicle>
            rowKey="id"
            columns={columns}
            dataSource={filteredVehicles}
            pagination={false}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => handleRowOpen(record),
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </Space>

      <VehicleCreateDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        onSubmit={(values) => {
          setVehicles((prev) => [
            ...prev,
            {
              id: Date.now(),
              garageNo: values.garageNo,
              stateNo: values.stateNo,
              model: values.model,
              type: values.type,
              status: values.status,
              driver: values.driver,
              park: values.park,
              mileage: Number(values.mileage),
              nextTO: values.nextTO,
            },
          ]);
        }}
      />

      <VehicleDrawer
        open={viewDrawerOpen}
        vehicle={selectedVehicle}
        onClose={() => {
          setViewDrawerOpen(false);
          setSelectedVehicle(null);
        }}
        onSubmit={(updatedVehicle) => {
          setVehicles((prev) =>
            prev.map((item) =>
              item.id === updatedVehicle.id ? updatedVehicle : item,
            ),
          );
        }}
      />
    </>
  );
};