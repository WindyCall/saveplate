// filepath: /c:/Users/yanxi/hemax/saveplate/lib/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FoodItem {
  name: string;
  provider: string;
  price?: number;
  imageUrl?: string;
  number?: number;
  description?: string;
  location?: string;
}

// interface UpdateFoodItemInputs {
//   name: string;
//   provider: string;
//   price?: number;
//   imageUrl?: string;
//   number?: number;
//   description?: string;
//   location?: string;
// }


export const fetchFoodItemsApiSlice = createApi({
  reducerPath: 'foodItemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/foodItems' }),
  tagTypes: ['foodItems'],
  endpoints: (build) => ({
    getFoodItems: build.query<FoodItem[], any>({
      query: (email) => `/fetchFoodItems?email=${email}`,
    }),
    updateFoodItem: build.mutation<any, FoodItem>({
      query: (body) => ({
        url: `/updateFoodItems`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useGetFoodItemsQuery, useUpdateFoodItemMutation } = fetchFoodItemsApiSlice;