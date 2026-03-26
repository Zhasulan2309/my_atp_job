import { Result } from 'antd';

interface Props {
  name: string;
}

export const PlaceholderPage = ({ name }: Props) => {
  return (
    <Result
      status="info"
      title={name}
      subTitle="Раздел в разработке"
    />
  );
};