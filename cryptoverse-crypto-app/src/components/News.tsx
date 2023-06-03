import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import moment, { unitOfTime } from 'moment';
import React, { FC, useState } from 'react';

import Loader from '../components/Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/newsApi';
import { Coin } from '../types/interfaces/coinsApi';
import { Value } from '../types/interfaces/newsApi';
const { Text, Title } = Typography;
const { Option } = Select;
interface Props {
  simplified: boolean;
}

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News: FC<Props> = ({ simplified }: Props) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value: string) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency: Coin) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news: Value, i: number) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>
                  {moment(news.datePublished)
                    .startOf('ss' as unitOfTime.StartOf)
                    .fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
