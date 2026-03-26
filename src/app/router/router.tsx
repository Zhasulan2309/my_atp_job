import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../main-layout/MainLayout";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { VehiclesPage } from "../../pages/vehicles/VehiclesPage";
import { RequestsPage } from "../../pages/requests/RequestsPage";
import { WaybillsPage } from "../../pages/waybills/WaybillsPage";
import { RepairsPage } from "../../pages/repairs/RepairsPage";
import { PlaceholderPage } from "../../pages/placeholder/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "vehicles",
        element: <VehiclesPage />,
      },
      {
        path: "requests",
        element: <RequestsPage />,
      },
      {
        path: "waybills",
        element: <WaybillsPage />,
      },
      {
        path: "repairs",
        element: <RepairsPage />,
      },
      {
        path: "schedule",
        element: <PlaceholderPage name="Разнарядки" />,
      },
      {
        path: "fuel",
        element: <PlaceholderPage name="Учет ГСМ" />,
      },
      {
        path: "tires",
        element: <PlaceholderPage name="Шины и АКБ" />,
      },
      {
        path: "routes",
        element: <PlaceholderPage name="Маршруты" />,
      },
      {
        path: "staff",
        element: <PlaceholderPage name="Сотрудники" />,
      },
    ],
  },
]);
