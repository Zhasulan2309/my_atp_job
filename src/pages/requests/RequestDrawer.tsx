import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import type { RequestItem } from './model/types';

const priorityOptions = [
  { label: 'Срочная', value: 'Срочная' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Низкая', value: 'Низкая' },
];

const statusOptions = [
  { label: 'Новая', value: 'Новая' },
  { label: 'В разнарядке', value: 'В разнарядке' },
  { label: 'Выполнена', value: 'Выполнена' },
  { label: 'Отменена', value: 'Отменена' },
];

interface FormValues {
  date: dayjs.Dayjs;
  client: string;
  dept: string;
  vehicleType: string;
  priority: RequestItem['priority'];
  status: RequestItem['status'];
  timeFrom: dayjs.Dayjs;
  timeTo: dayjs.Dayjs;
}

interface Props {
  open: boolean;
  request: RequestItem | null;
  onClose: () => void;
  onSubmit?: (values: RequestItem) => void;
}

export const RequestDrawer = ({
  open,
  request,
  onClose,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (request) {
      form.setFieldsValue({
        date: dayjs(request.date, 'DD.MM.YYYY'),
        client: request.client,
        dept: request.dept,
        vehicleType: request.vehicleType,
        priority: request.priority,
        status: request.status,
        timeFrom: dayjs(request.timeFrom, 'HH:mm'),
        timeTo: dayjs(request.timeTo, 'HH:mm'),
      });
    } else {
      form.resetFields();
    }
  }, [request, form]);

  const handleFinish = (values: FormValues) => {
    if (!request) return;

    onSubmit?.({
      ...request,
      date: values.date.format('DD.MM.YYYY'),
      client: values.client,
      dept: values.dept,
      vehicleType: values.vehicleType,
      priority: values.priority,
      status: values.status,
      timeFrom: values.timeFrom.format('HH:mm'),
      timeTo: values.timeTo.format('HH:mm'),
    });

    onClose();
  };

  return (
    <Drawer
      title={request ? `Заявка ${request.id}` : 'Карточка заявки'}
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
      {request ? (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Дата"
                name="date"
                rules={[{ required: true, message: 'Выберите дату' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Тип ТС"
                name="vehicleType"
                rules={[{ required: true, message: 'Заполните тип ТС' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Заказчик"
            name="client"
            rules={[{ required: true, message: 'Заполните заказчика' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Подразделение"
            name="dept"
            rules={[{ required: true, message: 'Заполните подразделение' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Приоритет"
                name="priority"
                rules={[{ required: true, message: 'Выберите приоритет' }]}
              >
                <Select options={priorityOptions} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: 'Выберите статус' }]}
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
                rules={[{ required: true, message: 'Выберите время начала' }]}
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Время до"
                name="timeTo"
                rules={[{ required: true, message: 'Выберите время окончания' }]}
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
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