import { useMemo, useState } from "react";
import { Button, Card, Segmented, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";

import { waybillMock } from "./model/mock";
import type { Waybill } from "./model/types";
import { WaybillDrawer } from "./WaybillDrawer";
import {
  WaybillCreateDrawer,
  type WaybillCreateValues,
} from "./WaybillCreateDrawer";

type WaybillFilter = "all" | "open" | "processed" | "closed";

const getStatusColor = (status: Waybill["status"]) => {
  switch (status) {
    case "Открыт":
      return "success";
    case "Обработан":
      return "processing";
    case "Закрыт":
      return "default";
    default:
      return "default";
  }
};

export const WaybillsPage = () => {
  const [filter, setFilter] = useState<WaybillFilter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [selectedWaybill, setSelectedWaybill] = useState<Waybill | null>(null);
  const [data, setData] = useState<Waybill[]>(waybillMock);

  const filteredData = useMemo(() => {
    switch (filter) {
      case "open":
        return data.filter((item) => item.status === "Открыт");
      case "processed":
        return data.filter((item) => item.status === "Обработан");
      case "closed":
        return data.filter((item) => item.status === "Закрыт");
      default:
        return data;
    }
  }, [filter, data]);

  const handleOpenDrawer = (row: Waybill) => {
    setSelectedWaybill(row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedWaybill(null);
  };

  const handleCreateWaybill = (values: WaybillCreateValues) => {
    const nextNumber = data.length + 2483;

    const newWaybill: Waybill = {
      id: `ПЛ-${nextNumber + 1}`,
      date: values.date.format("DD.MM.YYYY"),
      vehicle: values.vehicle,
      driver: values.driver,
      route: values.route,
      odoStart: Number(values.odoStart),
      fuelStart: Number(values.fuelStart),
      status: values.status,
    };

    setData((prev) => [newWaybill, ...prev]);
  };

  const columns: ColumnsType<Waybill> = [
    {
      title: "№ ПЛ",
      dataIndex: "id",
      key: "id",
      render: (value: string, row) => (
        <button
          type="button"
          onClick={() => handleOpenDrawer(row)}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            color: "#2563EB",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {value}
        </button>
      ),
      width: 120,
    },
    {
      title: "ДАТА",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "АВТОМОБИЛЬ",
      dataIndex: "vehicle",
      key: "vehicle",
      width: 220,
    },
    {
      title: "ВОДИТЕЛЬ",
      dataIndex: "driver",
      key: "driver",
      width: 160,
    },
    {
      title: "МАРШРУТ",
      dataIndex: "route",
      key: "route",
      width: 220,
    },
    {
      title: "СПИДОМЕТР НАЧ.",
      dataIndex: "odoStart",
      key: "odoStart",
      render: (value: number) => value.toLocaleString("ru-RU"),
      width: 170,
    },
    {
      title: "СПИДОМЕТР КОН.",
      dataIndex: "odoEnd",
      key: "odoEnd",
      render: (value?: number) => (value ? value.toLocaleString("ru-RU") : "—"),
      width: 170,
    },
    {
      title: "ГСМ НАЧ.",
      dataIndex: "fuelStart",
      key: "fuelStart",
      render: (value: number) => `${value} л`,
      width: 120,
    },
    {
      title: "ГСМ КОН.",
      dataIndex: "fuelEnd",
      key: "fuelEnd",
      render: (value?: number) => (value ? `${value} л` : "—"),
      width: 120,
    },
    {
      title: "СТАТУС",
      dataIndex: "status",
      key: "status",
      render: (value: Waybill["status"]) => (
        <Tag color={getStatusColor(value)}>{value}</Tag>
      ),
      width: 140,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Segmented<WaybillFilter>
            value={filter}
            onChange={(value) => setFilter(value)}
            options={[
              { label: "Все", value: "all" },
              { label: "Открытые", value: "open" },
              { label: "Обработанные", value: "processed" },
              { label: "Закрытые", value: "closed" },
            ]}
          />

          <Space>
            <Button icon={<FilterOutlined />}>Фильтр</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateDrawerOpen(true)}
            >
              Выписать ПЛ
            </Button>
          </Space>
        </div>

        <Card>
          <Table<Waybill>
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            scroll={{ x: 1400 }}
          />
        </Card>
      </Space>

      <WaybillDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        waybill={selectedWaybill}
      />

      <WaybillCreateDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        onSubmit={handleCreateWaybill}
      />
    </>
  );
};
