import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('reset', handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(() => (screenSize < 768 ? false : true));
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={'https://avatars.dicebear.com/api/open-peeps/cryptoverse.svg'} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Button
        className="menu-control-container"
        onClick={() => setActiveMenu((prevState) => !prevState)}
      >
        <MenuOutlined />
      </Button>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
