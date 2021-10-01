import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React, { FC } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Stats } from '../types/interfaces/coinsApi';

const { Title } = Typography;

const Homepage: FC = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  // console.log(data);

  const globalStats: Stats = data?.data?.stats;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {!isFetching ? (
        <Row>
          <Col span={12}>
            <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
          </Col>
          <Col span={12}>
            <Statistic title="Total 24-Hour Volume" value={millify(globalStats.total24hVolume)} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
          </Col>
        </Row>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Homepage;
