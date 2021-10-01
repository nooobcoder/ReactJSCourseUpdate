import { Card, Col, Row } from 'antd';
import millify from 'millify';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Coin } from '../types/interfaces/coinsApi';
interface Props {
  simplified: boolean;
}

const Cryptocurrencies: FC<any> = ({ simplified }: Props) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<Array<Coin>>(cryptosList?.data?.coins);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item: Coin) =>
      item.name.toLowerCase().includes(searchTerm),
    );

    setCryptos(filteredData);
  }, [cryptosList, cryptos, searchTerm]);

  console.log('CRYPTOS', cryptos);
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos?.map((currency) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
              <Link key={currency.id} to={`/crypto/${currency.id}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(parseInt(currency.price))}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Cryptocurrencies;
