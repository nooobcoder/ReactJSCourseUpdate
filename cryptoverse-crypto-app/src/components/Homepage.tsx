import { Col, Row, Statistic, Typography } from 'antd';
import React, { FC } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const Homepage: FC = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  console.log(data);

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24-Hour Volume" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value="5" />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
