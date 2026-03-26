import { Card, Typography } from 'antd';
import type { ReactNode } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useAppTheme } from '../../../../app/providers/ThemeProvider';

interface Props {
  title: string;
  value: string | number;
  extra?: string;
  extraType?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export const StatCard = ({
  title,
  value,
  extra,
  extraType = 'neutral',
  icon,
  iconBg,
  iconColor,
}: Props) => {
  const { theme } = useAppTheme();

  const extraColor =
    extraType === 'up'
      ? theme.green
      : extraType === 'down'
      ? theme.red
      : theme.textMuted;

  return (
    <Card
      styles={{
        body: {
          padding: 22,
        },
      }}
      style={{
        background: theme.bgCard,
        borderColor: theme.border,
        borderRadius: 16,
        boxShadow: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 18,
        }}
      >
        <Typography.Text
          style={{
            color: theme.textMuted,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography.Text>

        {icon ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: iconBg ?? theme.accentSoft,
              color: iconColor ?? theme.accent,
              fontSize: 18,
            }}
          >
            {icon}
          </div>
        ) : null}
      </div>

      <div
        style={{
          color: theme.text,
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {value}
      </div>

      {extra ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: extraColor,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {extraType === 'up' && <ArrowUpOutlined />}
          {extraType === 'down' && <ArrowDownOutlined />}
          <span>{extra}</span>
        </div>
      ) : null}
    </Card>
  );
};