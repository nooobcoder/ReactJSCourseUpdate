import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { CoinHistory } from '../types/interfaces/coinHistory';
import { Coin } from '../types/interfaces/coinsApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

interface ParamTypes {
  coinId: string;
}

const Cryptodetails: FC = () => {
  const { coinId } = useParams<ParamTypes>();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory }: CoinHistory = useGetCryptoHistoryQuery<CoinHistory>({
    coinId,
    timeperiod,
  });

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  let genericStats = [];
  let stats = [];

  const cryptoDetails: Coin = data?.data?.coin;
  console.log(coinId, data, isFetching);
  stats = data
    ? [
        {
          title: 'Price to USD',
          value: `$ ${cryptoDetails.price && millify(parseFloat(cryptoDetails.price))}`,
          icon: <DollarCircleOutlined />,
        },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        {
          title: '24h Volume',
          value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
          icon: <ThunderboltOutlined />,
        },
        {
          title: 'Market Cap',
          value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
          icon: <DollarCircleOutlined />,
        },
        {
          title: 'All-time-high(daily avg.)',
          value: `$ ${millify(parseFloat(cryptoDetails.allTimeHigh.price))}`,
          icon: <TrophyOutlined />,
        },
      ]
    : [];
  genericStats = data
    ? [
        {
          title: 'Number Of Markets',
          value: cryptoDetails.numberOfMarkets,
          icon: <FundOutlined />,
        },
        {
          title: 'Number Of Exchanges',
          value: cryptoDetails.numberOfExchanges,
          icon: <MoneyCollectOutlined />,
        },
        {
          title: 'Aprroved Supply',
          value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: 'Total Supply',
          value: `$ ${millify(cryptoDetails?.totalSupply ?? 0)}`,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: 'Circulating Supply',
          value: `$ ${millify(cryptoDetails?.circulatingSupply ?? 0)}`,
          icon: <ExclamationCircleOutlined />,
        },
      ]
    : [];
  console.log(genericStats);

  return (
    <>
      {data && (
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
            </Title>
            <p>
              {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap
              and supply.
            </p>
          </Col>
          <Select
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="Select Timeperiod"
            onChange={(value) => setTimeperiod(value)}
          >
            {time.map((date) => (
              <Option value={date} key={date}>
                {date}
              </Option>
            ))}
          </Select>
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(parseInt(cryptoDetails.price))}
            coinName={cryptoDetails.name}
          />
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails.name} Value Statistics
                </Title>
                <p>
                  An overview showing the statistics of {cryptoDetails.name}, such as the base and
                  quote currency, the rank, and trading volume.
                </p>
              </Col>
              {stats &&
                stats?.map(({ icon, title, value }) => (
                  <Col className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                ))}
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  Other Stats Info
                </Title>
                <p>
                  An overview showing the statistics of {cryptoDetails.name}, such as the base and
                  quote currency, the rank, and trading volume.
                </p>
              </Col>
              {genericStats &&
                genericStats?.map(({ icon, title, value }) => (
                  <Col className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                ))}
            </Col>
          </Col>
          <Col className="coin-desc-link">
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails.name}?
              </Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Row>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Links
              </Title>
              {cryptoDetails.links?.map((link) => (
                <Row className="coin-link" key={link.name}>
                  <Title level={5} className="link-name">
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}
            </Col>
          </Col>
        </Col>
      )}
    </>
  );
};

export default Cryptodetails;

/*  */
