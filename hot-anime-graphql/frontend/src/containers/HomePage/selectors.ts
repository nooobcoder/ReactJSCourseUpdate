import { createSelector } from 'reselect';
import { IRootState } from '../../app/types';

const selectHomePage = (state: IRootState) => state?.homePage;
const makeSelectAnimePage = createSelector(
  selectHomePage,
  (homePage) => homePage.animePage
);

export default makeSelectAnimePage;
