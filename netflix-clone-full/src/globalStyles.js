import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 100;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff) format('woff')
}

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 300;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff) format('woff')
}

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 400;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff) format('woff')
}

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 700;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff) format('woff')
}

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 800;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff) format('woff')
}

@font-face {
    font-family: 'Netflix Sans';
    font-weight: 900;
    font-display: optional;
    src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Blk.woff2) format('woff2'),url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Blk.woff) format('woff')
}

  *, *:before, *:after {
    box-sizing: border-box;
    cursor:none;
  }
  html, body {
    height: 100%;
    font-family: 'Netflix Sans','Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000000;
    color: #333333;
    font-size: 16px;
  }
`;
