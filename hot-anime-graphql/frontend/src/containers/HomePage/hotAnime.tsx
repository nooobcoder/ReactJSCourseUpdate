import React from 'react';
import { createSelector } from 'reselect';
import { useAppSelector } from '../../app/hooks';
import makeSelectAnimePage from './selectors';

import styled from 'styled-components';

const HotAnimeContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  justify-content: space-evenly;
`;

const AnimeItemContainer = styled.div`
  width: 14em;
  height: 20em;
  background: salmon;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimeCover = styled.div`
  width: auto;
  height: 15em;

  img {
    width: auto;
    height: 100%;
  }
`;

const AnimeTitle = styled.h6`
  margin-top: 8px;
  font-size: 19px;
  color: #000;
  font-weight: 600;
`;

const stateSelector = createSelector(makeSelectAnimePage, (animePage: any) => ({
  animePage,
}));

export const HotAnime = () => {
  const { animePage } = useAppSelector(stateSelector);

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0;

  if (isEmptyAnimePage) return null;
  return (
    <HotAnimeContainer>
      {animePage.media.map((anime: any) => (
        <AnimeItemContainer>
          <AnimeCover>
            <img src={anime?.coverImage?.large || ''} alt="anime" />
          </AnimeCover>
          <AnimeTitle>{anime?.title?.english}</AnimeTitle>
        </AnimeItemContainer>
      ))}
    </HotAnimeContainer>
  );
};
