import { useMemo, useState } from 'react';
import { Button, Card, Segmented, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

import {
  RequestCreateDrawer,
  type RequestCreateValues,
} from './RequestCreateDrawer';
import { RequestDrawer } from './RequestDrawer';
import type { RequestItem } from './model/types';

type FilterKey = 'all' | 'new' | 'active' | 'done';

const initialRequests: RequestItem[] = [
  {
    id: 'З-0412',
    date: '12.03.2026',
    client: 'ТОО Kazatomprom',
    dept: 'УРМ Шиели',
    vehicleType: 'Самосвал',
    status: 'Новая',
    priority: 'Срочная',
    timeFrom: '08:00',
    timeTo: '17:00',
  },
  {
    id: 'З-0411',
    date: '12.03.2026',
    client: 'ТОО Южполиметалл',
    dept: 'Рудник',
    vehicleType: 'Сед. тягач',
    status: 'В разнарядке',
    priority: 'Средняя',
    timeFrom: '06:00',
    timeTo: '18:00',
  },
  {
    id: 'З-0410',
    date: '11.03.2026',
    client: 'ТОО Kazatomprom',
    dept: 'Администрация',
    vehicleType: 'Легковой',
    status: 'Выполнена',
    priority: 'Низкая',
    timeFrom: '09:00',
    timeTo: '13:00',
  },
  {
    id: 'З-0409',
    date: '11.03.2026',
    client: 'АО НАК Казатомпром',
    dept: 'РУ-6',
    vehicleType: 'Автобус',
    status: 'Выполнена',
    priority: 'Средняя',
    timeFrom: '07:00',
    timeTo: '19:00',
  },
  {
    id: 'З-0408',
    date: '10.03.2026',
    client: 'ТОО Южполиметалл',
    dept: 'Карьер',
    vehicleType: 'Бульдозер',
    status: 'Отменена',
    priority: 'Низкая',
    timeFrom: '08:00',
    timeTo: '16:00',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Срочная':
      return 'error';
    case 'Средняя':
      return 'warning';
    case 'Низкая':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Новая':
      return 'processing';
    case 'В разнарядке':
      return 'purple';
    case 'Выполнена':
      return 'success';
    case 'Отменена':
      return 'error';
    default:
      return 'default';
  }
};

export const RequestsPage = () => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);

  const filteredRequests = useMemo(() => {
    switch (filter) {
      case 'new':
        return requests.filter((item) => item.status === 'Новая');
      case 'active':
        return requests.filter((item) => item.status === 'В разнарядке');
      case 'done':
        return requests.filter(
          (item) => item.status === 'Выполнена' || item.status === 'Отменена',
        );
      default:
        return requests;
    }
  }, [filter, requests]);

  const columns: ColumnsType<RequestItem> = [
    {
      title: '№ ЗАЯВКИ',
      dataIndex: 'id',
      key: 'id',
      render: (value) => (
        <Typography.Text strong style={{ color: '#2563EB' }}>
          {value}
        </Typography.Text>
      ),
      width: 140,
    },
    {
      title: 'ДАТА',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'ЗАКАЗЧИК',
      dataIndex: 'client',
      key: 'client',
      width: 220,
    },
    {
      title: 'ПОДРАЗДЕЛЕНИЕ',
      dataIndex: 'dept',
      key: 'dept',
      width: 200,
    },
    {
      title: 'ТИП ТС',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      width: 150,
    },
    {
      title: 'ПРИОРИТЕТ',
      dataIndex: 'priority',
      key: 'priority',
      render: (value) => <Tag color={getPriorityColor(value)}>{value}</Tag>,
      width: 140,
    },
    {
      title: 'ВРЕМЯ',
      key: 'time',
      render: (_, row) => `${row.timeFrom} — ${row.timeTo}`,
      width: 150,
    },
    {
      title: 'СТАТУС',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={getStatusColor(value)}>{value}</Tag>,
      width: 160,
    },
  ];

  const handleCreate = (values: RequestCreateValues) => {
    const nextNumber = requests.length + 413;

    const newRequest: RequestItem = {
      id: `З-0${nextNumber}`,
      date: values.date.format('DD.MM.YYYY'),
      client: values.client,
      dept: values.dept,
      vehicleType: values.vehicleType,
      priority: values.priority,
      status: values.status,
      timeFrom: values.timeFrom.format('HH:mm'),
      timeTo: values.timeTo.format('HH:mm'),
    };

    setRequests((prev) => [newRequest, ...prev]);
  };

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
              { label: 'Новые', value: 'new' },
              { label: 'В работе', value: 'active' },
              { label: 'Завершённые', value: 'done' },
            ]}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateDrawerOpen(true)}
          >
            Новая заявка
          </Button>
        </div>

        <Card>
          <Table<RequestItem>
            rowKey="id"
            columns={columns}
            dataSource={filteredRequests}
            pagination={false}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedRequest(record);
                setViewDrawerOpen(true);
              },
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </Space>

      <RequestCreateDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        onSubmit={handleCreate}
      />

      <RequestDrawer
        open={viewDrawerOpen}
        request={selectedRequest}
        onClose={() => {
          setViewDrawerOpen(false);
          setSelectedRequest(null);
        }}
        onSubmit={(updatedRequest) => {
          setRequests((prev) =>
            prev.map((item) =>
              item.id === updatedRequest.id ? updatedRequest : item,
            ),
          );
        }}
      />
    </>
  );
};