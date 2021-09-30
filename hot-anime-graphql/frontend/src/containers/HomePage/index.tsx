import React, { useEffect } from 'react';
import styled from 'styled-components';
import animeService from '../../app/services/animeService';

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = (props: IHomePageProps) => {
  const fetchAnimePage = async () => {
    const animePage = await animeService
      .getAnimePage(0)
      .catch((err) => console.error('[ERROR] ', err));

    console.log('ANIME PAGE: ', animePage);
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <Container>
      <h1>Hot Anime</h1>
    </Container>
  );
};

export default HomePage;
