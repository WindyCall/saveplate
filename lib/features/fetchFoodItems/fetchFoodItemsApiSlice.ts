// filepath: /c:/Users/yanxi/hemax/saveplate/lib/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const fetchFoodItemsApiSlice = createApi({
  reducerPath: 'fetchFoodItems',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['fetchFoodItems'],
  endpoints: (builder) => ({
    getFoodItems: builder.query<FoodItem[], any>({
      query: (email) => `/fetchFoodItems?email=${email}`,
    }),
  }),
});

export const { useGetFoodItemsQuery } = fetchFoodItemsApiSlice;