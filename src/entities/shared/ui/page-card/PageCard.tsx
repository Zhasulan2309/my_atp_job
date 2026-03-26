import { Card } from "antd";
import type { PropsWithChildren } from "react";

export const PageCard = ({ children }: PropsWithChildren) => {
  return <Card>{children}</Card>;
};