import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import type { Vehicle } from "./model/types";

const statusOptions = [
  { label: "В работе", value: "В работе" },
  { label: "В ремонте", value: "В ремонте" },
  { label: "Консервация", value: "Консервация" },
  { label: "На списании", value: "На списании" },
];

interface Props {
  open: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  onSubmit?: (values: Vehicle) => void;
}

export const VehicleDrawer = ({ open, vehicle, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm<Vehicle>();

  useEffect(() => {
    if (vehicle) {
      form.setFieldsValue(vehicle);
    } else {
      form.resetFields();
    }
  }, [vehicle, form]);

  const handleFinish = (values: Vehicle) => {
    if (!vehicle) return;

    onSubmit?.({
      ...vehicle,
      ...values,
      mileage: Number(values.mileage),
    });

    onClose();
  };

  return (
    <Drawer
      title={vehicle ? `${vehicle.model} — ${vehicle.stateNo}` : "Карточка ТС"}
      placement="right"
      open={open}
      onClose={onClose}
      width={720}
      styles={{
        body: {
          paddingBottom: 24,
        },
      }}
    >
      {vehicle ? (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Гар. №"
                name="garageNo"
                rules={[
                  { required: true, message: "Заполните гаражный номер" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Гос. номер"
                name="stateNo"
                rules={[{ required: true, message: "Заполните гос. номер" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Модель"
            name="model"
            rules={[{ required: true, message: "Заполните модель" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Тип"
                name="type"
                rules={[{ required: true, message: "Заполните тип" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: "Выберите статус" }]}
              >
                <Select options={statusOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Водитель"
            name="driver"
            rules={[{ required: true, message: "Заполните водителя" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Автопарк"
            name="park"
            rules={[{ required: true, message: "Заполните автопарк" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Пробег"
                name="mileage"
                rules={[{ required: true, message: "Заполните пробег" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="След. ТО"
                name="nextTO"
                rules={[{ required: true, message: "Заполните следующее ТО" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </Form>
      ) : null}
    </Drawer>
  );
};
