import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoAPIHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '1e7c59df3emsh4eefa8d504f06f8p14cef4jsn346cdff81a11',
};
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const options = {
  method: 'GET',
  url: baseUrl,
  headers: cryptoAPIHeaders,
};

const createRequest = (url: string) => ({ url, headers: cryptoAPIHeaders });

export const cryptoAPI = createApi({
  reducerPath: 'crypto',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({ query: () => createRequest('/coins') }),
  }),
});

export const { useGetCryptosQuery } = cryptoAPI;
