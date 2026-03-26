import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { themes, type ThemeMode } from "./theme";

type ThemeContextValue = {
  mode: ThemeMode;
  theme: (typeof themes)[ThemeMode];
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const currentTheme = themes[mode];

  const antdConfig = useMemo(
    () => ({
      algorithm:
        mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: currentTheme.accent,
        colorBgBase: currentTheme.bg,
        colorTextBase: currentTheme.text,
        colorBorder: currentTheme.border,
        colorBgContainer: currentTheme.bgCard,
        borderRadius: 12,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      components: {
        Layout: {
          bodyBg: currentTheme.contentBg,
          siderBg: currentTheme.siderBg,
          headerBg: currentTheme.headerBg,
        },
        Card: {
          colorBgContainer: currentTheme.bgCard,
        },
        Table: {
          headerBg: currentTheme.bgCard,
          borderColor: currentTheme.border,
          rowHoverBg: currentTheme.bgHover,
        },
        Input: {
          colorBgContainer: currentTheme.inputBg,
        },
        Drawer: {
          colorBgElevated: currentTheme.bgCard,
        },
      },
    }),
    [mode, currentTheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: currentTheme,
        toggleTheme,
      }}
    >
      <ConfigProvider theme={antdConfig}>
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
