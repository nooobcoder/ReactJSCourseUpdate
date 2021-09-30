import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import animeService from '../../app/services/animeService';
import { GetAnimePage } from '../../app/services/animeService/__generated__/GetAnimePage';
import { setAnimePage } from './homepageSlice';
import { HotAnime } from './hotAnime';

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage['Page']) => dispatch(setAnimePage(page)),
});

const HomePage = (props: IHomePageProps) => {
  const { setAnimePage } = actionDispatch(useAppDispatch());

  const fetchAnimePage = async () => {
    const animePage = await animeService
      .getAnimePage(0, 100)
      .catch((err) => console.error('[ERROR] ', err));

    console.log('ANIME PAGE: ', animePage);
    if (animePage) {
      setAnimePage(animePage);
    }
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime />
    </Container>
  );
};

export default HomePage;
