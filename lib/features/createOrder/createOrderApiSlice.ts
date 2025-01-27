// filepath: /c:/Users/yanxi/hemax/saveplate/lib/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Order {
    userEmail: string;
    foodName: string;
    providerEmail: string;
    paymentMethod: string;
    status: string;
    orderNumber: number;
}

export const createOrderApiSlice = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/order' }),
  tagTypes: ['order'],
  endpoints: (build) => ({
    getOrder: build.query<Order[], any>({
      query: (email) => `/fetchOrders?email=${email}`,
    }),
    createOrder: build.mutation<any, Order>({
      query: (body) => ({
        url: `/createOrder`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useGetOrderQuery, useCreateOrderMutation } = createOrderApiSlice;