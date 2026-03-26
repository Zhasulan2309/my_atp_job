import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import type { RequestItem, RequestPriority, RequestStatus } from './model/types';

const priorityOptions: { label: string; value: RequestPriority }[] = [
  { label: 'Срочная', value: 'Срочная' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Низкая', value: 'Низкая' },
];

const statusOptions: { label: string; value: RequestStatus }[] = [
  { label: 'Новая', value: 'Новая' },
  { label: 'В разнарядке', value: 'В разнарядке' },
  { label: 'Выполнена', value: 'Выполнена' },
  { label: 'Отменена', value: 'Отменена' },
];

export interface RequestCreateValues {
  date: dayjs.Dayjs;
  client: string;
  dept: string;
  vehicleType: string;
  priority: RequestPriority;
  status: RequestStatus;
  timeFrom: dayjs.Dayjs;
  timeTo: dayjs.Dayjs;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: RequestCreateValues) => void;
}

export const RequestCreateDrawer = ({ open, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm<RequestCreateValues>();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleFinish = (values: RequestCreateValues) => {
    onSubmit?.(values);
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Новая заявка"
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
          status: "Новая",
          priority: "Средняя",
          date: dayjs(),
          timeFrom: dayjs("08:00", "HH:mm"),
          timeTo: dayjs("17:00", "HH:mm"),
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
              label="Тип ТС"
              name="vehicleType"
              rules={[{ required: true, message: "Заполните тип ТС" }]}
            >
              <Input placeholder="Например: Самосвал" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Заказчик"
          name="client"
          rules={[{ required: true, message: "Заполните заказчика" }]}
        >
          <Input placeholder="Например: ТОО Kazatomprom" />
        </Form.Item>

        <Form.Item
          label="Подразделение"
          name="dept"
          rules={[{ required: true, message: "Заполните подразделение" }]}
        >
          <Input placeholder="Например: УРМ Шиели" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Приоритет"
              name="priority"
              rules={[{ required: true, message: "Выберите приоритет" }]}
            >
              <Select options={priorityOptions} />
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Время с"
              name="timeFrom"
              rules={[{ required: true, message: "Выберите время начала" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Время до"
              name="timeTo"
              rules={[{ required: true, message: "Выберите время окончания" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
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
