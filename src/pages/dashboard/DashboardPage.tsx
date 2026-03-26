import {
  AppstoreOutlined,
  CarOutlined,
  NotificationOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Card, Col, Progress, Row, Typography } from "antd";
import { StatCard } from "../../entities/shared/ui/stat-card/StatCard";
import { useAppTheme } from "../../app/providers/ThemeProvider";

const fuelChart = [65, 72, 58, 80, 74, 69, 78, 82, 71, 85, 77, 73];

const parkStats = [
  { label: "В работе", count: 34, percent: 72, colorType: "green" },
  { label: "В ремонте", count: 5, percent: 11, colorType: "amber" },
  { label: "Консервация", count: 4, percent: 9, colorType: "muted" },
  { label: "На списании", count: 2, percent: 4, colorType: "red" },
  { label: "Прочее", count: 2, percent: 4, colorType: "purple" },
] as const;

const recentEvents = [
  {
    time: "14:32",
    text: "ПЛ-2487 открыт — КАМАЗ 65115, Иванов А.С.",
    colorType: "accent",
  },
  {
    time: "13:15",
    text: "Заявка З-0412 создана — ТОО Kazatomprom, самосвал",
    colorType: "purple",
  },
  {
    time: "11:48",
    text: "ТО-2 завершен — КАМАЗ 65115, пробег 145 280 км",
    colorType: "green",
  },
  {
    time: "10:20",
    text: "Toyota Hilux (003) передан в ремонт — подшипник ступицы",
    colorType: "amber",
  },
  {
    time: "09:05",
    text: "Разнарядка на 12.03.2026 утверждена — 8 единиц ТС",
    colorType: "accent",
  },
] as const;

const monthLabels = [
  "Я",
  "Ф",
  "М",
  "А",
  "М",
  "И",
  "И",
  "А",
  "С",
  "О",
  "Н",
  "Д",
];

export const DashboardPage = () => {
  const { theme } = useAppTheme();
  const maxFuel = Math.max(...fuelChart);

  const getColor = (type: string) => {
    switch (type) {
      case "green":
        return theme.green;
      case "amber":
        return theme.amber;
      case "red":
        return theme.red;
      case "purple":
        return theme.purple;
      case "accent":
        return theme.accent;
      case "muted":
        return theme.textMuted;
      default:
        return theme.accent;
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Всего ТС"
            value={47}
            extra="+2 за месяц"
            extraType="up"
            icon={<CarOutlined />}
            iconBg={theme.accentSoft}
            iconColor={theme.accent}
          />
        </Col>

        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="На линии"
            value={34}
            extra="72% парка"
            extraType="up"
            icon={<NotificationOutlined />}
            iconBg="rgba(34,197,94,0.12)"
            iconColor={theme.green}
          />
        </Col>

        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="В ремонте"
            value={5}
            extra="-1 за неделю"
            extraType="down"
            icon={<ToolOutlined />}
            iconBg="rgba(245,158,11,0.12)"
            iconColor={theme.amber}
          />
        </Col>

        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Заявок сегодня"
            value={12}
            extra="+3 от вчера"
            extraType="up"
            icon={<AppstoreOutlined />}
            iconBg="rgba(168,85,247,0.12)"
            iconColor={theme.purple}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="stretch" style={{ marginBottom: 16 }}>
        <Col xs={24} xl={12} style={{ display: "flex" }}>
          <Card
            styles={{
              body: {
                padding: 22,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              },
            }}
            style={{
              background: theme.bgCard,
              borderColor: theme.border,
              borderRadius: 16,
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 18,
              }}
            >
              <div>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    color: theme.text,
                    fontWeight: 700,
                  }}
                >
                  Расход ГСМ
                </Typography.Title>

                <Typography.Text
                  style={{
                    color: theme.textMuted,
                    fontSize: 13,
                  }}
                >
                  тыс. литров за 12 мес.
                </Typography.Text>
              </div>

              <div
                style={{
                  background: "rgba(34,197,94,0.12)",
                  color: theme.green,
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                -4.2%
              </div>
            </div>

            <div
              style={{
                height: 150,
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                marginTop: 8,
              }}
            >
              {fuelChart.map((value, index) => {
                const barHeight = (value / maxFuel) * 96;

                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 54,
                        height: `${barHeight}px`,
                        borderRadius: 6,
                        background:
                          index === fuelChart.length - 1
                            ? theme.accent
                            : theme.barInactive,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: theme.textDim,
                      }}
                    >
                      {monthLabels[index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={12} style={{ display: "flex" }}>
          <Card
            styles={{
              body: {
                padding: 22,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              },
            }}
            style={{
              background: theme.bgCard,
              borderColor: theme.border,
              borderRadius: 16,
              height: "100%",
              width: "100%",
            }}
          >
            <Typography.Title
              level={5}
              style={{
                marginTop: 0,
                marginBottom: 24,
                color: theme.text,
                fontWeight: 700,
              }}
            >
              Состояние парка
            </Typography.Title>

            {parkStats.map((item) => {
              const color = getColor(item.colorType);

              return (
                <div key={item.label} style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: theme.text,
                        fontSize: 14,
                      }}
                    >
                      {item.label}
                    </Typography.Text>

                    <Typography.Text
                      style={{
                        color: theme.textMuted,
                        fontSize: 14,
                      }}
                    >
                      {item.count} ({item.percent}%)
                    </Typography.Text>
                  </div>

                  <Progress
                    percent={item.percent}
                    showInfo={false}
                    strokeColor={color}
                    trailColor={theme.border}
                    strokeWidth={6}
                  />
                </div>
              );
            })}
          </Card>
        </Col>
      </Row>

      <Card
        styles={{
          body: {
            padding: "18px 22px 20px",
          },
        }}
        style={{
          background: theme.bgCard,
          borderColor: theme.border,
          borderRadius: 16,
          boxShadow: "none",
        }}
      >
        <Typography.Title
          level={5}
          style={{
            marginTop: 0,
            marginBottom: 18,
            color: theme.text,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: "24px",
          }}
        >
          Последние события
        </Typography.Title>

        <div>
          {recentEvents.map((event, index) => (
            <div
              key={`${event.time}-${index}`}
              style={{
                display: "grid",
                gridTemplateColumns: "10px 44px 1fr",
                alignItems: "center",
                columnGap: 14,
                minHeight: 38,
                padding: "0 0 0 0",
                borderBottom:
                  index === recentEvents.length - 1
                    ? "none"
                    : `1px solid ${theme.borderLight ?? theme.border}`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: getColor(event.colorType),
                  justifySelf: "center",
                }}
              />

              <Typography.Text
                style={{
                  color: theme.textDim,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {event.time}
              </Typography.Text>

              <Typography.Text
                style={{
                  color: theme.text,
                  fontSize: 14,
                  lineHeight: "22px",
                }}
              >
                {event.text}
              </Typography.Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
