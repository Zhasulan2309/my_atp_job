import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { AppSidebar } from "../../widgets/app-sidebar/ui/AppSidebar";
import { AppTopbar } from "../../widgets/app-topbar/ui/AppTopbar";
import { useAppTheme } from "../providers/ThemeProvider";

const pageMetaMap: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Дашборд",
    subtitle: "Обзор автотранспортного предприятия",
  },
  "/vehicles": {
    title: "Автотранспорт",
    subtitle: "Управление парком транспортных средств",
  },
  "/requests": {
    title: "Заявки на транспорт",
    subtitle: "Приём и обработка заявок",
  },
  "/waybills": {
    title: "Путевые листы",
    subtitle: "Выписка и обработка путевых листов",
  },
  "/schedule": {
    title: "Разнарядки",
    subtitle: "Ежедневные разнарядки выхода ТС",
  },
  "/repairs": {
    title: "ТО и ремонты",
    subtitle: "Техническое обслуживание и ремонты",
  },
  "/fuel": {
    title: "Учет ГСМ",
    subtitle: "Нормы и расход ГСМ",
  },
  "/tires": {
    title: "Шины и АКБ",
    subtitle: "Учёт шин и аккумуляторов",
  },
  "/routes": {
    title: "Маршруты",
    subtitle: "Справочник маршрутов",
  },
  "/staff": {
    title: "Сотрудники",
    subtitle: "Водители и персонал",
  },
};

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useAppTheme();

  const pageMeta = useMemo(() => {
    return pageMetaMap[location.pathname] ?? pageMetaMap["/"];
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: theme.contentBg,
      }}
    >
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          background: theme.contentBg,
        }}
      >
        <AppTopbar
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
        />

        <main
          style={{
            flex: 1,
            minHeight: 0,
            padding: 28,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
