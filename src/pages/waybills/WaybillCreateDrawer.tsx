import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";

export interface WaybillCreateValues {
  date: dayjs.Dayjs;
  vehicle: string;
  driver: string;
  route: string;
  odoStart: number;
  fuelStart: number;
  status: "Открыт" | "Обработан" | "Закрыт";
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: WaybillCreateValues) => void;
}

const statusOptions = [
  { label: "Открыт", value: "Открыт" },
  { label: "Обработан", value: "Обработан" },
  { label: "Закрыт", value: "Закрыт" },
] as const;

export const WaybillCreateDrawer = ({ open, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm<WaybillCreateValues>();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleFinish = (values: WaybillCreateValues) => {
    onSubmit?.(values);
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Выписать путевой лист"
      placement="right"
      open={open}
      onClose={handleClose}
      width={720}
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
          date: dayjs(),
          status: "Открыт",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Дата"
              name="date"
              rules={[{ required: true, message: "Выберите дату" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Статус"
              name="status"
              rules={[{ required: true, message: "Выберите статус" }]}
            >
              <Select
                options={
                  statusOptions as unknown as { label: string; value: string }[]
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Автомобиль"
          name="vehicle"
          rules={[{ required: true, message: "Заполните автомобиль" }]}
        >
          <Input placeholder="Например: КАМАЗ 65115 (001)" />
        </Form.Item>

        <Form.Item
          label="Водитель"
          name="driver"
          rules={[{ required: true, message: "Заполните водителя" }]}
        >
          <Input placeholder="Например: Иванов А.С." />
        </Form.Item>

        <Form.Item
          label="Маршрут"
          name="route"
          rules={[{ required: true, message: "Заполните маршрут" }]}
        >
          <Input placeholder="Например: Таукент — Шиели" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Спидометр нач."
              name="odoStart"
              rules={[
                { required: true, message: "Заполните начальный спидометр" },
              ]}
            >
              <Input type="number" placeholder="Например: 145120" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="ГСМ нач."
              name="fuelStart"
              rules={[
                { required: true, message: "Заполните начальный остаток ГСМ" },
              ]}
            >
              <Input type="number" placeholder="Например: 180" suffix="л" />
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
