import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import type { Vehicle, VehicleStatus } from "./model/types";

const statusOptions: { label: string; value: VehicleStatus }[] = [
  { label: 'В работе', value: 'В работе' },
  { label: 'В ремонте', value: 'В ремонте' },
  { label: 'Консервация', value: 'Консервация' },
  { label: 'На списании', value: 'На списании' },
];

interface VehicleCreateDrawerValues {
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: VehicleCreateDrawerValues) => void;
}

export const VehicleCreateDrawer = ({ open, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm<VehicleCreateDrawerValues>();

  const handleFinish = (values: VehicleCreateDrawerValues) => {
    onSubmit?.(values);
    form.resetFields();
    onClose();
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Добавить ТС"
      placement="right"
      open={open}
      onClose={handleClose}
      width="50%"
      styles={{
        body: {
          paddingBottom: 24,
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          status: "В работе",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Гар. №"
              name="garageNo"
              rules={[{ required: true, message: "Заполните гаражный номер" }]}
            >
              <Input placeholder="Например: 009" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Гос. номер"
              name="stateNo"
              rules={[{ required: true, message: "Заполните гос. номер" }]}
            >
              <Input placeholder="Например: 123 ABC 02" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Модель"
          name="model"
          rules={[{ required: true, message: "Заполните модель" }]}
        >
          <Input placeholder="Например: КАМАЗ 65115" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Тип"
              name="type"
              rules={[{ required: true, message: "Заполните тип ТС" }]}
            >
              <Input placeholder="Например: Самосвал" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Статус"
              name="status"
              rules={[{ required: true, message: "Выберите статус" }]}
            >
              <Select options={statusOptions} placeholder="Выберите статус" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Водитель"
          name="driver"
          rules={[{ required: true, message: "Заполните водителя" }]}
        >
          <Input placeholder="Например: Иванов А.С." />
        </Form.Item>

        <Form.Item
          label="Автопарк"
          name="park"
          rules={[{ required: true, message: "Заполните автопарк" }]}
        >
          <Input placeholder="Например: А/Х Таукент" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Пробег"
              name="mileage"
              rules={[{ required: true, message: "Заполните пробег" }]}
            >
              <Input type="number" placeholder="Например: 145280" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="След. ТО"
              name="nextTO"
              rules={[{ required: true, message: "Заполните следующее ТО" }]}
            >
              <Input placeholder="Например: ТО-2 через 1200 км" />
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
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};
