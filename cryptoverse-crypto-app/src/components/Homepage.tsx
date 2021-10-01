import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Stats } from '../types/interfaces/coinsApi';
import { Cryptocurrencies, News } from '.';

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
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
