import { useState, useEffect, createContext, useContext } from "react";

// ─── THEME DEFINITIONS ───
const themes = {
  dark: {
    bg: "#0F1117",
    bgCard: "#181B23",
    bgHover: "#1E2230",
    bgActive: "#252A3A",
    border: "#2A2E3B",
    borderLight: "#353A4A",
    text: "#E8EAF0",
    textMuted: "#8B90A0",
    textDim: "#5C6178",
    accent: "#3B82F6",
    accentHover: "#2563EB",
    accentSoft: "rgba(59,130,246,0.12)",
    green: "#22C55E",
    greenSoft: "rgba(34,197,94,0.12)",
    amber: "#F59E0B",
    amberSoft: "rgba(245,158,11,0.12)",
    red: "#EF4444",
    redSoft: "rgba(239,68,68,0.12)",
    purple: "#A855F7",
    purpleSoft: "rgba(168,85,247,0.12)",
    shadow: "0 1px 3px rgba(0,0,0,0.3)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.4)",
    overlayBg: "rgba(0,0,0,0.55)",
    inputBg: "#0F1117",
    tabBg: "#0F1117",
    tabActiveBg: "#181B23",
    tabActiveShadow: "0 1px 3px rgba(0,0,0,0.2)",
    scrollThumb: "#2A2E3B",
    scrollThumbHover: "#353A4A",
    logoBg: "linear-gradient(135deg, #3B82F6, #6366F1)",
    barInactive: "rgba(59,130,246,0.19)",
  },
  light: {
    bg: "#F3F4F8",
    bgCard: "#FFFFFF",
    bgHover: "#F0F1F5",
    bgActive: "#E8EAF0",
    border: "#E2E4EA",
    borderLight: "#D0D3DC",
    text: "#1A1D2B",
    textMuted: "#6B7085",
    textDim: "#9CA0B0",
    accent: "#2563EB",
    accentHover: "#1D4ED8",
    accentSoft: "rgba(37,99,235,0.08)",
    green: "#16A34A",
    greenSoft: "rgba(22,163,74,0.08)",
    amber: "#D97706",
    amberSoft: "rgba(217,119,6,0.08)",
    red: "#DC2626",
    redSoft: "rgba(220,38,38,0.08)",
    purple: "#9333EA",
    purpleSoft: "rgba(147,51,234,0.08)",
    shadow: "0 1px 3px rgba(0,0,0,0.06)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.1)",
    overlayBg: "rgba(0,0,0,0.25)",
    inputBg: "#F3F4F8",
    tabBg: "#ECEDF2",
    tabActiveBg: "#FFFFFF",
    tabActiveShadow: "0 1px 3px rgba(0,0,0,0.08)",
    scrollThumb: "#D0D3DC",
    scrollThumbHover: "#B8BCC8",
    logoBg: "linear-gradient(135deg, #2563EB, #7C3AED)",
    barInactive: "rgba(37,99,235,0.13)",
  },
};

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// ─── ICONS ───
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Truck: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Document: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Wrench: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Fuel: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9l-3-3"/><path d="M3 22h12"/><rect x="6" y="8" width="4" height="4" rx=".5"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Battery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="10" x2="23" y2="14"/><line x1="7" y1="10" x2="7" y2="14"/><line x1="11" y1="10" x2="11" y2="14"/></svg>,
  Route: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  ArrowUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  ArrowDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Clipboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  Sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
};

// ─── MOCK DATA ───
const vehiclesData = [
  { id: 1, garageNo: "001", stateNo: "150 ABA 02", model: "КАМАЗ 65115", type: "Самосвал", status: "В работе", driver: "Иванов А.С.", park: "А/Х Таукент", mileage: 145280, fuel: 78, nextTO: "ТО-2 через 1200 км" },
  { id: 2, garageNo: "002", stateNo: "320 BCA 02", model: "MAN TGA 18.480", type: "Седельный тягач", status: "В работе", driver: "Петров Б.В.", park: "А/Х Таукент", mileage: 312400, fuel: 45, nextTO: "ТО-1 через 3400 км" },
  { id: 3, garageNo: "003", stateNo: "780 DDA 02", model: "Toyota Hilux", type: "Легковой ТС", status: "В ремонте", driver: "Сидоров К.М.", park: "А/Х Шиели", mileage: 89200, fuel: 92, nextTO: "ТО-1 просрочен" },
  { id: 4, garageNo: "004", stateNo: "441 EEA 02", model: "HOWO ZZ4257", type: "Седельный тягач", status: "В работе", driver: "Нурланов Д.Е.", park: "Кыземшек", mileage: 201300, fuel: 61, nextTO: "ТО-3 через 800 км" },
  { id: 5, garageNo: "005", stateNo: "592 FFA 02", model: "Hyundai HD78", type: "Бортовой ТС", status: "Консервация", driver: "—", park: "Оңтүстік", mileage: 56700, fuel: 30, nextTO: "—" },
  { id: 6, garageNo: "006", stateNo: "813 GGA 02", model: "ПАЗ 32054", type: "Автобус", status: "В работе", driver: "Абдиев Р.Т.", park: "А/Х Шиели", mileage: 178900, fuel: 55, nextTO: "ТО-2 через 2100 км" },
  { id: 7, garageNo: "007", stateNo: "102 HHA 02", model: "CAT D6", type: "Бульдозер", status: "В работе", driver: "Касымов Н.А.", park: "Кыземшек", mileage: 4200, fuel: 82, nextTO: "ТО-1 через 120 м/ч" },
  { id: 8, garageNo: "008", stateNo: "255 JJA 02", model: "Iveco Trakker", type: "Самосвал", status: "На списании", driver: "—", park: "А/Х Таукент", mileage: 450100, fuel: 0, nextTO: "—" },
];

const requestsData = [
  { id: "З-0412", date: "12.03.2026", client: "ТОО Kazatomprom", dept: "УРМ Шиели", vehicleType: "Самосвал", status: "Новая", priority: "Срочная", timeFrom: "08:00", timeTo: "17:00" },
  { id: "З-0411", date: "12.03.2026", client: "ТОО Южполиметалл", dept: "Рудник", vehicleType: "Сед. тягач", status: "В разнарядке", priority: "Средняя", timeFrom: "06:00", timeTo: "18:00" },
  { id: "З-0410", date: "11.03.2026", client: "ТОО Kazatomprom", dept: "Администрация", vehicleType: "Легковой", status: "Выполнена", priority: "Низкая", timeFrom: "09:00", timeTo: "13:00" },
  { id: "З-0409", date: "11.03.2026", client: "АО НАК Казатомпром", dept: "РУ-6", vehicleType: "Автобус", status: "Выполнена", priority: "Средняя", timeFrom: "07:00", timeTo: "19:00" },
  { id: "З-0408", date: "10.03.2026", client: "ТОО Южполиметалл", dept: "Карьер", vehicleType: "Бульдозер", status: "Отменена", priority: "Низкая", timeFrom: "08:00", timeTo: "16:00" },
];

const waybillsData = [
  { id: "ПЛ-2487", date: "12.03.2026", vehicle: "КАМАЗ 65115 (001)", driver: "Иванов А.С.", status: "Открыт", mileageStart: 145120, mileageEnd: null, fuelStart: 180, fuelEnd: null, route: "Таукент — Шиели" },
  { id: "ПЛ-2486", date: "12.03.2026", vehicle: "MAN TGA (002)", driver: "Петров Б.В.", status: "Открыт", mileageStart: 312100, mileageEnd: null, fuelStart: 220, fuelEnd: null, route: "Таукент — Кызылорда" },
  { id: "ПЛ-2485", date: "11.03.2026", vehicle: "ПАЗ 32054 (006)", driver: "Абдиев Р.Т.", status: "Обработан", mileageStart: 178600, mileageEnd: 178900, fuelStart: 90, fuelEnd: 55, route: "Шиели маршрут №3" },
  { id: "ПЛ-2484", date: "11.03.2026", vehicle: "HOWO ZZ4257 (004)", driver: "Нурланов Д.Е.", status: "Обработан", mileageStart: 200900, mileageEnd: 201300, fuelStart: 280, fuelEnd: 195, route: "Кыземшек — Шымкент" },
  { id: "ПЛ-2483", date: "10.03.2026", vehicle: "Toyota Hilux (003)", driver: "Сидоров К.М.", status: "Закрыт", mileageStart: 88900, mileageEnd: 89200, fuelStart: 42, fuelEnd: 30, route: "Шиели — Таукент" },
];

const repairsData = [
  { id: "РЛ-0089", date: "12.03.2026", vehicle: "Toyota Hilux (003)", type: "Ремонт", status: "В работе", desc: "Замена ступичного подшипника передней оси", cost: "85 000 ₸" },
  { id: "ТО-0234", date: "10.03.2026", vehicle: "КАМАЗ 65115 (001)", type: "ТО-2", status: "Завершен", desc: "Плановое ТО-2, замена масла и фильтров", cost: "142 000 ₸" },
  { id: "РЛ-0088", date: "08.03.2026", vehicle: "ПАЗ 32054 (006)", type: "Ремонт", status: "Завершен", desc: "Ремонт тормозной системы", cost: "210 000 ₸" },
  { id: "ТО-0233", date: "05.03.2026", vehicle: "MAN TGA (002)", type: "ТО-1", status: "Завершен", desc: "Плановое ТО-1", cost: "98 000 ₸" },
];

// ─── THEME TOGGLE ───
const ThemeToggle = () => {
  const { mode, toggle } = useTheme();
  const t = themes[mode];
  const isDark = mode === "dark";
  return (
    <button onClick={toggle} title={isDark ? "Светлая тема" : "Тёмная тема"} style={{
      width: 44, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
      background: isDark ? t.borderLight : t.accent,
      position: "relative", padding: 0, transition: "background 0.3s", flexShrink: 0,
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%",
        background: isDark ? "#3B4252" : "#fff",
        position: "absolute", top: 3,
        left: isDark ? 3 : 21,
        transition: "left 0.3s cubic-bezier(.4,0,.2,1), background 0.3s",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)", color: isDark ? "#F59E0B" : "#F59E0B",
      }}>
        <span style={{ display: "flex" }}>
          {isDark ? <Icons.Moon /> : <Icons.Sun />}
        </span>
      </div>
    </button>
  );
};

// ─── UTILITY COMPONENTS ───
const Badge = ({ children, color = "accent" }) => {
  const { mode } = useTheme();
  const t = themes[mode];
  const colors = {
    accent: { bg: t.accentSoft, text: t.accent },
    green: { bg: t.greenSoft, text: t.green },
    amber: { bg: t.amberSoft, text: t.amber },
    red: { bg: t.redSoft, text: t.red },
    purple: { bg: t.purpleSoft, text: t.purple },
    muted: { bg: mode === "dark" ? "rgba(139,144,160,0.1)" : "rgba(107,112,133,0.08)", text: t.textMuted },
  };
  const c = colors[color] || colors.accent;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: c.bg, color: c.text, whiteSpace: "nowrap" }}>{children}</span>;
};

const StatusBadge = ({ status }) => {
  const map = { "В работе": "green", "Открыт": "green", "Новая": "accent", "В разнарядке": "purple", "В ремонте": "amber", "Завершен": "green", "Обработан": "green", "Консервация": "muted", "На списании": "red", "Выполнена": "green", "Отменена": "red", "Закрыт": "muted", "Срочная": "red", "Средняя": "amber", "Низкая": "muted" };
  return <Badge color={map[status] || "muted"}>{status}</Badge>;
};

const StatCard = ({ label, value, change, changeDir, icon, color }) => {
  const { mode } = useTheme(); const t = themes[mode]; const c = color || t.accent;
  return (
    <div style={{ background: t.bgCard, borderRadius: 14, padding: "20px 22px", border: `1px solid ${t.border}`, flex: "1 1 0", minWidth: 180, transition: "all 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = t.borderLight}
      onMouseLeave={e => e.currentTarget.style.borderColor = t.border}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ color: t.textMuted, fontSize: 13, fontWeight: 500 }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}14`, display: "flex", alignItems: "center", justifyContent: "center", color: c }}>{icon}</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {change && <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 12, fontWeight: 500, color: changeDir === "up" ? t.green : t.red }}>{changeDir === "up" ? <Icons.ArrowUp /> : <Icons.ArrowDown />}{change}</div>}
    </div>
  );
};

// ─── SIDEBAR ───
const navItems = [
  { key: "dashboard", label: "Дашборд", icon: <Icons.Dashboard /> },
  { key: "vehicles", label: "Автотранспорт", icon: <Icons.Truck /> },
  { key: "requests", label: "Заявки", icon: <Icons.Clipboard /> },
  { key: "waybills", label: "Путевые листы", icon: <Icons.Document /> },
  { key: "schedule", label: "Разнарядки", icon: <Icons.Calendar /> },
  { key: "repairs", label: "ТО и ремонты", icon: <Icons.Wrench /> },
  { key: "fuel", label: "Учет ГСМ", icon: <Icons.Fuel /> },
  { key: "tires", label: "Шины и АКБ", icon: <Icons.Battery /> },
  { key: "routes", label: "Маршруты", icon: <Icons.Route /> },
  { key: "staff", label: "Сотрудники", icon: <Icons.Users /> },
];

const Sidebar = ({ active, onNav, collapsed, onToggle }) => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <aside style={{ width: collapsed ? 64 : 240, minHeight: "100vh", background: t.bgCard, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", transition: "all 0.25s cubic-bezier(.4,0,.2,1)", overflow: "hidden", flexShrink: 0, zIndex: 10 }}>
      <div style={{ padding: collapsed ? "20px 14px" : "20px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12, minHeight: 64 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: t.logoBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>УА</div>
        {!collapsed && <div><div style={{ fontWeight: 700, fontSize: 15, color: t.text, whiteSpace: "nowrap" }}>УАП</div><div style={{ fontSize: 11, color: t.textDim, whiteSpace: "nowrap" }}>KAP Logistics</div></div>}
      </div>
      <nav style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map(item => {
          const isA = active === item.key;
          return (
            <button key={item.key} onClick={() => onNav(item.key)} title={collapsed ? item.label : undefined}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: isA ? t.accentSoft : "transparent", color: isA ? t.accent : t.textMuted, fontSize: 13.5, fontWeight: isA ? 600 : 500, transition: "all 0.15s", textAlign: "left", width: "100%", justifyContent: collapsed ? "center" : "flex-start" }}
              onMouseEnter={e => { if (!isA) { e.currentTarget.style.background = t.bgHover; e.currentTarget.style.color = t.text; }}}
              onMouseLeave={e => { if (!isA) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.textMuted; }}}>
              <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 8, borderTop: `1px solid ${t.border}` }}>
        <button onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: t.textDim, fontSize: 13, width: "100%" }}
          onMouseEnter={e => e.currentTarget.style.color = t.textMuted} onMouseLeave={e => e.currentTarget.style.color = t.textDim}>
          <span style={{ display: "flex", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}><Icons.ChevronRight /></span>
          {!collapsed && "Свернуть"}
        </button>
      </div>
    </aside>
  );
};

// ─── TOPBAR ───
const TopBar = ({ title, subtitle }) => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <header style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.border}`, background: t.bgCard, transition: "all 0.3s" }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: t.textMuted, margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.inputBg, borderRadius: 10, padding: "8px 14px", border: `1px solid ${t.border}`, width: 240, transition: "all 0.3s" }}>
          <span style={{ color: t.textDim, display: "flex" }}><Icons.Search /></span>
          <input placeholder="Поиск..." style={{ border: "none", background: "transparent", outline: "none", color: t.text, fontSize: 13, width: "100%" }} />
        </div>
        <ThemeToggle />
        <button style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${t.border}`, background: t.inputBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.textMuted, position: "relative", transition: "all 0.3s" }}>
          <Icons.Bell />
          <div style={{ position: "absolute", top: 7, right: 8, width: 7, height: 7, borderRadius: "50%", background: t.red }} />
        </button>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: t.logoBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>АО</div>
      </div>
    </header>
  );
};

// ─── TABLE ───
const DataTable = ({ columns, data, onRowClick }) => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${t.border}`, background: t.bgCard, transition: "all 0.3s" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr>
          {columns.map((col, i) => <th key={i} style={{ padding: "12px 16px", textAlign: "left", color: t.textDim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${t.border}`, whiteSpace: "nowrap", background: t.bgCard }}>{col.label}</th>)}
        </tr></thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? "pointer" : "default", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.bgHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {columns.map((col, ci) => <td key={ci} style={{ padding: "12px 16px", color: t.text, borderBottom: `1px solid ${t.border}`, whiteSpace: "nowrap" }}>{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── SLIDE-OVER ───
const SlideOver = ({ open, onClose, title, children, width = 560 }) => {
  const { mode } = useTheme(); const t = themes[mode];
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: t.overlayBg, backdropFilter: "blur(4px)" }} />
      <div style={{ width, maxWidth: "90vw", background: t.bgCard, borderLeft: `1px solid ${t.border}`, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, animation: "slideIn 0.25s ease-out", transition: "background 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${t.border}` }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: t.bgHover, color: t.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }}><Icons.Close /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── FORM ───
const FormField = ({ label, value, placeholder, type = "text" }) => {
  const { mode } = useTheme(); const t = themes[mode];
  const s = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.inputBg, color: t.text, fontSize: 13, outline: "none", boxSizing: "border-box", transition: "all 0.3s" };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
      {type === "select" ? <select style={{ ...s, appearance: "none" }}><option>{value || placeholder}</option></select> : <input type={type} defaultValue={value} placeholder={placeholder} style={s} />}
    </div>
  );
};
const FormRow = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: `repeat(${Array.isArray(children) ? children.length : 1}, 1fr)`, gap: 12 }}>{children}</div>;

// ─── TABS ───
const Tabs = ({ tabs, active, onChange }) => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <div style={{ display: "flex", gap: 2, background: t.tabBg, borderRadius: 10, padding: 3, marginBottom: 20, width: "fit-content", transition: "background 0.3s" }}>
      {tabs.map(tab => <button key={tab.key} onClick={() => onChange(tab.key)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: active === tab.key ? t.tabActiveBg : "transparent", color: active === tab.key ? t.text : t.textMuted, fontSize: 13, fontWeight: active === tab.key ? 600 : 500, boxShadow: active === tab.key ? t.tabActiveShadow : "none", transition: "all 0.15s" }}>{tab.label}</button>)}
    </div>
  );
};

// ─── DASHBOARD ───
const DashboardPage = () => {
  const { mode } = useTheme(); const t = themes[mode];
  const fuelChart = [65, 72, 58, 80, 74, 69, 78, 82, 71, 85, 77, 73]; const mx = Math.max(...fuelChart);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard label="Всего ТС" value="47" change="+2 за месяц" changeDir="up" icon={<Icons.Truck />} color={t.accent} />
        <StatCard label="На линии" value="34" change="72% парка" changeDir="up" icon={<Icons.Route />} color={t.green} />
        <StatCard label="В ремонте" value="5" change="-1 за неделю" changeDir="down" icon={<Icons.Wrench />} color={t.amber} />
        <StatCard label="Заявок сегодня" value="12" change="+3 от вчера" changeDir="up" icon={<Icons.Clipboard />} color={t.purple} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: t.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${t.border}`, transition: "all 0.3s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div><div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Расход ГСМ</div><div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>тыс. литров за 12 мес.</div></div>
            <Badge color="green">-4.2%</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
            {fuelChart.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: (v / mx) * 100, borderRadius: 5, background: i === fuelChart.length - 1 ? t.accent : t.barInactive, transition: "all 0.3s" }} />
                <span style={{ fontSize: 10, color: t.textDim }}>{"ЯФМАМИИАСОНД"[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: t.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${t.border}`, transition: "all 0.3s" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 20 }}>Состояние парка</div>
          {[{ label: "В работе", count: 34, pct: 72, color: t.green }, { label: "В ремонте", count: 5, pct: 11, color: t.amber }, { label: "Консервация", count: 4, pct: 9, color: t.textMuted }, { label: "На списании", count: 2, pct: 4, color: t.red }, { label: "Прочее", count: 2, pct: 4, color: t.purple }].map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 13, color: t.textMuted }}>{item.count} ({item.pct}%)</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: t.inputBg }}><div style={{ height: "100%", borderRadius: 3, width: `${item.pct}%`, background: item.color, transition: "width 0.5s" }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: t.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${t.border}`, transition: "all 0.3s" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>Последние события</div>
        {[{ time: "14:32", text: "ПЛ-2487 открыт — КАМАЗ 65115, Иванов А.С.", type: "accent" }, { time: "13:15", text: "Заявка З-0412 создана — ТОО Kazatomprom, самосвал", type: "purple" }, { time: "11:48", text: "ТО-2 завершен — КАМАЗ 65115, пробег 145 280 км", type: "green" }, { time: "10:20", text: "Toyota Hilux (003) передан в ремонт — подшипник ступицы", type: "amber" }, { time: "09:05", text: "Разнарядка на 12.03.2026 утверждена — 8 единиц ТС", type: "accent" }].map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${t.border}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: t[e.type] || t.accent }} />
            <span style={{ fontSize: 12, color: t.textDim, fontWeight: 600, minWidth: 42 }}>{e.time}</span>
            <span style={{ fontSize: 13, color: t.text }}>{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── VEHICLES ───
const VehiclesPage = ({ onSelect }) => {
  const { mode } = useTheme(); const t = themes[mode];
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? vehiclesData : vehiclesData.filter(v => v.status === (filter === "work" ? "В работе" : filter === "repair" ? "В ремонте" : "Консервация"));
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Tabs tabs={[{ key: "all", label: "Все" }, { key: "work", label: "В работе" }, { key: "repair", label: "В ремонте" }, { key: "idle", label: "Прочие" }]} active={filter} onChange={setFilter} />
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600 }}><Icons.Plus /> Добавить ТС</button>
      </div>
      <DataTable columns={[
        { label: "Гар.№", key: "garageNo" },
        { label: "Гос.номер", key: "stateNo", render: r => <span style={{ fontWeight: 600, fontFamily: "monospace" }}>{r.stateNo}</span> },
        { label: "Модель", key: "model" },
        { label: "Тип", key: "type" },
        { label: "Статус", render: r => <StatusBadge status={r.status} /> },
        { label: "Водитель", key: "driver" },
        { label: "Автопарк", key: "park" },
        { label: "Пробег", render: r => <span style={{ fontFamily: "monospace" }}>{r.mileage.toLocaleString()} км</span> },
        { label: "След. ТО", render: r => <span style={{ color: r.nextTO?.includes("просрочен") ? t.red : t.textMuted, fontSize: 12 }}>{r.nextTO}</span> },
      ]} data={filtered} onRowClick={onSelect} />
    </div>
  );
};

// ─── REQUESTS ───
const RequestsPage = () => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Tabs tabs={[{ key: "all", label: "Все" }, { key: "new", label: "Новые" }, { key: "active", label: "В работе" }, { key: "done", label: "Завершённые" }]} active="all" onChange={() => {}} />
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600 }}><Icons.Plus /> Новая заявка</button>
      </div>
      <DataTable columns={[
        { label: "№ заявки", render: r => <span style={{ fontWeight: 600, color: t.accent }}>{r.id}</span> },
        { label: "Дата", key: "date" }, { label: "Заказчик", key: "client" }, { label: "Подразделение", key: "dept" }, { label: "Тип ТС", key: "vehicleType" },
        { label: "Приоритет", render: r => <StatusBadge status={r.priority} /> },
        { label: "Время", render: r => `${r.timeFrom} — ${r.timeTo}` },
        { label: "Статус", render: r => <StatusBadge status={r.status} /> },
      ]} data={requestsData} />
    </div>
  );
};

// ─── WAYBILLS ───
const WaybillsPage = () => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Tabs tabs={[{ key: "all", label: "Все" }, { key: "open", label: "Открытые" }, { key: "processed", label: "Обработанные" }, { key: "closed", label: "Закрытые" }]} active="all" onChange={() => {}} />
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: `1px solid ${t.border}`, cursor: "pointer", background: t.bgCard, color: t.textMuted, fontSize: 13, fontWeight: 500 }}><Icons.Filter /> Фильтр</button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600 }}><Icons.Plus /> Выписать ПЛ</button>
        </div>
      </div>
      <DataTable columns={[
        { label: "№ ПЛ", render: r => <span style={{ fontWeight: 600, color: t.accent }}>{r.id}</span> },
        { label: "Дата", key: "date" }, { label: "Автомобиль", key: "vehicle" }, { label: "Водитель", key: "driver" }, { label: "Маршрут", key: "route" },
        { label: "Спидометр нач.", render: r => <span style={{ fontFamily: "monospace" }}>{r.mileageStart?.toLocaleString()}</span> },
        { label: "Спидометр кон.", render: r => r.mileageEnd ? <span style={{ fontFamily: "monospace" }}>{r.mileageEnd?.toLocaleString()}</span> : <span style={{ color: t.textDim }}>—</span> },
        { label: "ГСМ нач.", render: r => `${r.fuelStart} л` },
        { label: "ГСМ кон.", render: r => r.fuelEnd ? `${r.fuelEnd} л` : <span style={{ color: t.textDim }}>—</span> },
        { label: "Статус", render: r => <StatusBadge status={r.status} /> },
      ]} data={waybillsData} />
    </div>
  );
};

// ─── REPAIRS ───
const RepairsPage = () => {
  const { mode } = useTheme(); const t = themes[mode];
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard label="Запланировано ТО" value="6" icon={<Icons.Calendar />} color={t.accent} />
        <StatCard label="В ремонте сейчас" value="3" icon={<Icons.Wrench />} color={t.amber} />
        <StatCard label="Завершено за мес." value="14" change="+3 от пред." changeDir="up" icon={<Icons.Wrench />} color={t.green} />
        <StatCard label="Затраты за мес." value="1.2М ₸" change="-8% от пред." changeDir="down" icon={<Icons.Fuel />} color={t.purple} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Tabs tabs={[{ key: "all", label: "Все" }, { key: "to", label: "ТО" }, { key: "repair", label: "Ремонты" }, { key: "defect", label: "Деф. ведомости" }]} active="all" onChange={() => {}} />
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10, border: `1px solid ${t.border}`, cursor: "pointer", background: t.bgCard, color: t.textMuted, fontSize: 13, fontWeight: 600 }}><Icons.Document /> Деф. ведомость</button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600 }}><Icons.Plus /> Ремонтный лист</button>
        </div>
      </div>
      <DataTable columns={[
        { label: "№", render: r => <span style={{ fontWeight: 600, color: t.accent }}>{r.id}</span> },
        { label: "Дата", key: "date" }, { label: "Автомобиль", key: "vehicle" },
        { label: "Тип", render: r => <Badge color={r.type.startsWith("ТО") ? "accent" : "amber"}>{r.type}</Badge> },
        { label: "Описание", key: "desc" }, { label: "Стоимость", render: r => <span style={{ fontWeight: 600 }}>{r.cost}</span> },
        { label: "Статус", render: r => <StatusBadge status={r.status} /> },
      ]} data={repairsData} />
    </div>
  );
};

const PlaceholderPage = ({ name }) => {
  const { mode } = useTheme(); const t = themes[mode];
  return <div style={{ padding: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, color: t.textDim }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🚧</div><div style={{ fontWeight: 600, color: t.textMuted, marginBottom: 4 }}>{name}</div><div>Раздел в разработке</div></div></div>;
};

// ─── VEHICLE DETAIL ───
const VehicleDetail = ({ vehicle, open, onClose }) => {
  const { mode } = useTheme(); const t = themes[mode];
  const [activeTab, setActiveTab] = useState("main");
  if (!vehicle) return null;
  return (
    <SlideOver open={open} onClose={onClose} title={`${vehicle.model} — ${vehicle.stateNo}`} width={620}>
      <Tabs tabs={[{ key: "main", label: "Основное" }, { key: "data", label: "Данные авто" }, { key: "fuel", label: "ГСМ" }, { key: "docs", label: "Документы" }, { key: "gps", label: "GPS" }]} active={activeTab} onChange={setActiveTab} />
      {activeTab === "main" && <>
        <div style={{ display: "flex", gap: 12, padding: 16, background: t.inputBg, borderRadius: 12, marginBottom: 20, alignItems: "center", transition: "background 0.3s" }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: `linear-gradient(135deg, ${t.accentSoft}, ${t.purpleSoft})`, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}><Icons.Truck /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{vehicle.model}</div><div style={{ fontSize: 13, color: t.textMuted }}>{vehicle.type} · Гар.№ {vehicle.garageNo}</div></div>
          <StatusBadge status={vehicle.status} />
        </div>
        <FormRow><FormField label="Гос. номер" value={vehicle.stateNo} /><FormField label="Гаражный номер" value={vehicle.garageNo} /></FormRow>
        <FormRow><FormField label="Автопарк" value={vehicle.park} type="select" /><FormField label="Тип ТС" value={vehicle.type} type="select" /></FormRow>
        <FormRow><FormField label="Основной водитель" value={vehicle.driver} type="select" /><FormField label="Текущее состояние" value={vehicle.status} type="select" /></FormRow>
        <FormRow><FormField label="Год выпуска" value="2019" /><FormField label="Дата ввода" value="15.06.2019" /></FormRow>
        <FormField label="VIN" value="XTC65115R92458731" />
        <FormField label="Пробег" value={`${vehicle.mileage.toLocaleString()} км`} />
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.textMuted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Отмена</button>
          <button style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: t.accent, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Сохранить</button>
        </div>
      </>}
      {activeTab === "data" && <>
        <FormField label="Номер двигателя" value="740.51-320" />
        <FormRow><FormField label="Мощность (л/с)" value="320" /><FormField label="Мощность (кВт)" value="235" /></FormRow>
        <FormField label="Номер КПП" value="ZF16S" />
        <FormRow><FormField label="Номер кузова" value="—" /><FormField label="Номер шасси" value="XTC65115R92458731" /></FormRow>
        <FormRow><FormField label="Собственный вес" value="10 250 кг" /><FormField label="Грузоподъёмность" value="15 000 кг" /></FormRow>
        <FormRow><FormField label="Объём бака" value="350 л" /><FormField label="Цвет кузова" value="Оранжевый" /></FormRow>
      </>}
      {activeTab === "fuel" && <>
        <div style={{ padding: 16, background: t.inputBg, borderRadius: 12, marginBottom: 16, transition: "background 0.3s" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.textMuted, marginBottom: 8 }}>Основной ГСМ</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Дизельное топливо</div>
        </div>
        <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${t.border}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr>{["Параметр", "Лето", "Зима"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: t.textDim, fontSize: 11, fontWeight: 600, textTransform: "uppercase", borderBottom: `1px solid ${t.border}` }}>{h}</th>)}</tr></thead>
            <tbody>{[["Базовая норма", "32.0", "36.8"], ["На запуск", "0.25", "0.35"], ["На отопитель", "—", "1.5"], ["На моточас", "8.5", "9.8"]].map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: "10px 14px", color: j === 0 ? t.textMuted : t.text, borderBottom: `1px solid ${t.border}`, fontWeight: j > 0 ? 600 : 400 }}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </>}
      {activeTab === "docs" && <div>
        {[{ name: "Тех. паспорт", s: "AP", n: "0458731", f: "15.06.2019", to: "—" }, { name: "Страховой полис", s: "СП", n: "2024-8891", f: "01.01.2026", to: "31.12.2026" }, { name: "Тех. осмотр", s: "ТО", n: "26-04581", f: "10.02.2026", to: "10.02.2027" }].map((d, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, background: t.inputBg, borderRadius: 10, marginBottom: 8, border: `1px solid ${t.border}`, transition: "background 0.3s" }}>
            <div><div style={{ fontWeight: 600, fontSize: 13, color: t.text }}>{d.name}</div><div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{d.s} {d.n}</div></div>
            <div style={{ fontSize: 12, color: t.textMuted }}>{d.f} — {d.to}</div>
          </div>
        ))}
      </div>}
      {activeTab === "gps" && <>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[{ l: "Трекер", v: "Установлен" }, { l: "ДУТ", v: "Активен" }].map((x, i) => <div key={i} style={{ flex: 1, padding: 14, background: t.inputBg, borderRadius: 10, border: `1px solid ${t.border}`, transition: "background 0.3s" }}><div style={{ fontSize: 11, color: t.textDim, marginBottom: 4 }}>{x.l}</div><div style={{ fontWeight: 600, color: t.green, fontSize: 13 }}>{x.v}</div></div>)}
        </div>
        <FormField label="Система мониторинга" value="Wialon" type="select" />
        <FormField label="Идентификатор GPS" value="IMEI:862107048592413" />
        <FormField label="Телефонный №" value="+7 701 234 5678" />
      </>}
    </SlideOver>
  );
};

// ─── MAIN APP ───
export default function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const t = themes[themeMode];
  const pageMap = {
    dashboard: { title: "Дашборд", subtitle: "Обзор автотранспортного предприятия" },
    vehicles: { title: "Автотранспорт", subtitle: "Управление парком транспортных средств" },
    requests: { title: "Заявки на транспорт", subtitle: "Приём и обработка заявок" },
    waybills: { title: "Путевые листы", subtitle: "Выписка и обработка путевых листов" },
    schedule: { title: "Разнарядки", subtitle: "Ежедневные разнарядки выхода ТС" },
    repairs: { title: "ТО и ремонты", subtitle: "Техническое обслуживание и ремонты" },
    fuel: { title: "Учет ГСМ", subtitle: "Нормы и расход горюче-смазочных материалов" },
    tires: { title: "Шины и АКБ", subtitle: "Учёт шин и аккумуляторов" },
    routes: { title: "Маршруты", subtitle: "Справочник маршрутов" },
    staff: { title: "Сотрудники", subtitle: "Водители и персонал" },
  };
  const cur = pageMap[page] || pageMap.dashboard;
  return (
    <ThemeContext.Provider value={{ mode: themeMode, toggle: () => setThemeMode(m => m === "dark" ? "light" : "dark") }}>
      <div style={{ display: "flex", minHeight: "100vh", background: t.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: t.text, transition: "background 0.35s, color 0.35s" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { margin: 0; background: ${t.bg}; transition: background 0.35s; }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: ${t.scrollThumbHover}; }
          input::placeholder { color: ${t.textDim} !important; }
          select { appearance: none; }
          @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        `}</style>
        <Sidebar active={page} onNav={setPage} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          <TopBar title={cur.title} subtitle={cur.subtitle} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "vehicles" && <VehiclesPage onSelect={v => setSelectedVehicle(v)} />}
            {page === "requests" && <RequestsPage />}
            {page === "waybills" && <WaybillsPage />}
            {page === "repairs" && <RepairsPage />}
            {page === "schedule" && <PlaceholderPage name="Разнарядки" />}
            {page === "fuel" && <PlaceholderPage name="Учет ГСМ" />}
            {page === "tires" && <PlaceholderPage name="Шины и АКБ" />}
            {page === "routes" && <PlaceholderPage name="Маршруты" />}
            {page === "staff" && <PlaceholderPage name="Сотрудники" />}
          </div>
        </main>
        <VehicleDetail vehicle={selectedVehicle} open={!!selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      </div>
    </ThemeContext.Provider>
  );
}
