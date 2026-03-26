import {
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Typography } from "antd";
import { useAppTheme } from "../../../app/providers/ThemeProvider";

interface Props {
  title: string;
  subtitle: string;
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export const AppTopbar = ({
  title,
  subtitle,
  collapsed,
  onToggleSidebar,
}: Props) => {
  const { mode, theme, toggleTheme } = useAppTheme();

  return (
    <header
      style={{
        height: 72,
        minHeight: 72,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleSidebar}
          style={{
            color: theme.textMuted,
          }}
        />

        <div>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              color: theme.text,
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            {title}
          </Typography.Title>

          <Typography.Text
            style={{
              color: theme.textMuted,
              fontSize: 13,
            }}
          >
            {subtitle}
          </Typography.Text>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Input
          placeholder="Поиск..."
          prefix={<SearchOutlined style={{ color: theme.textDim }} />}
          style={{
            width: 240,
            height: 40,
            background: theme.inputBg,
            borderColor: theme.border,
            color: theme.text,
          }}
        />

        <Button
          type="text"
          icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ color: theme.textMuted }}
        />

        <Button
          type="text"
          icon={<BellOutlined />}
          style={{ color: theme.textMuted }}
        />

        <Avatar
          style={{
            background: theme.logoBg,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Ж
        </Avatar>
      </div>
    </header>
  );
};
