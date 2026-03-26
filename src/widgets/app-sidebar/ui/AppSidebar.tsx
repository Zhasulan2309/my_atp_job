import { Typography } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ToolOutlined,
  FireOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppTheme } from "../../../app/providers/ThemeProvider";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  {
    key: "dashboard",
    label: "Дашборд",
    path: "/",
    icon: <DashboardOutlined />,
  },
  {
    key: "vehicles",
    label: "Автотранспорт",
    path: "/vehicles",
    icon: <CarOutlined />,
  },
  {
    key: "requests",
    label: "Заявки",
    path: "/requests",
    icon: <FileTextOutlined />,
  },
  {
    key: "waybills",
    label: "Путевые листы",
    path: "/waybills",
    icon: <FileTextOutlined />,
  },
  {
    key: "schedule",
    label: "Разнарядки",
    path: "/schedule",
    icon: <CalendarOutlined />,
  },
  {
    key: "repairs",
    label: "ТО и ремонты",
    path: "/repairs",
    icon: <ToolOutlined />,
  },
  { key: "fuel", label: "Учет ГСМ", path: "/fuel", icon: <FireOutlined /> },
  {
    key: "tires",
    label: "Шины и АКБ",
    path: "/tires",
    icon: <DeploymentUnitOutlined />,
  },
  {
    key: "routes",
    label: "Маршруты",
    path: "/routes",
    icon: <DeploymentUnitOutlined />,
  },
  { key: "staff", label: "Сотрудники", path: "/staff", icon: <TeamOutlined /> },
];

export const AppSidebar = ({ collapsed, onToggle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useAppTheme();

  const isActive = (path: string) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        width: collapsed ? 72 : 248,
        minWidth: collapsed ? 72 : 248,
        maxWidth: collapsed ? 72 : 248,
        height: "100vh",
        background: theme.siderBg,
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        overflow: "hidden",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          height: 72,
          padding: collapsed ? "16px 12px" : "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: theme.logoBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          УА
        </div>

        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <Typography.Text
              style={{
                display: "block",
                color: theme.text,
                fontWeight: 700,
                fontSize: 15,
                lineHeight: "20px",
              }}
            >
              УАП
            </Typography.Text>
            <Typography.Text
              style={{
                color: theme.textDim,
                fontSize: 11,
                lineHeight: "16px",
              }}
            >
              KAP Logistics
            </Typography.Text>
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          padding: 8,
          overflowY: "auto",
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                height: 44,
                marginBottom: 4,
                border: "none",
                borderRadius: 10,
                background: active ? theme.accentSoft : "transparent",
                color: active ? theme.accent : theme.textMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: 12,
                padding: collapsed ? "0 8px" : "0 14px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontSize: 13.5,
                fontWeight: active ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = theme.bgHover;
                  e.currentTarget.style.color = theme.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = theme.textMuted;
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 18, display: "flex" }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>

      <div
        style={{
          padding: 8,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <button
          onClick={onToggle}
          style={{
            width: "100%",
            height: 44,
            border: "none",
            borderRadius: 10,
            background: "transparent",
            color: theme.textDim,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 12,
            padding: collapsed ? "0 8px" : "0 14px",
            cursor: "pointer",
          }}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
          {!collapsed && "Свернуть"}
        </button>
      </div>
    </aside>
  );
};
