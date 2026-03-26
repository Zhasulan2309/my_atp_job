import type { ReactNode } from 'react';
import {
  DashboardOutlined,
  CarOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ToolOutlined,
  FireOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import type { NavKey } from '../../../entities/shared/model/navigation';

export type NavItem = {
  key: NavKey;
  label: string;
  icon: ReactNode;
  path: string;
};

export const navItems: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Дашборд',
    icon: <DashboardOutlined />,
    path: '/',
  },
  {
    key: 'vehicles',
    label: 'Автотранспорт',
    icon: <CarOutlined />,
    path: '/vehicles',
  },
  {
    key: 'requests',
    label: 'Заявки',
    icon: <FileTextOutlined />,
    path: '/requests',
  },
  {
    key: 'waybills',
    label: 'Путевые листы',
    icon: <FileTextOutlined />,
    path: '/waybills',
  },
  {
    key: 'schedule',
    label: 'Разнарядки',
    icon: <CalendarOutlined />,
    path: '/schedule',
  },
  {
    key: 'repairs',
    label: 'ТО и ремонты',
    icon: <ToolOutlined />,
    path: '/repairs',
  },
  {
    key: 'fuel',
    label: 'Учет ГСМ',
    icon: <FireOutlined />,
    path: '/fuel',
  },
  {
    key: 'tires',
    label: 'Шины и АКБ',
    icon: <DeploymentUnitOutlined />,
    path: '/tires',
  },
  {
    key: 'routes',
    label: 'Маршруты',
    icon: <DeploymentUnitOutlined />,
    path: '/routes',
  },
  {
    key: 'staff',
    label: 'Сотрудники',
    icon: <TeamOutlined />,
    path: '/staff',
  },
];