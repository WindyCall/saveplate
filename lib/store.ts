import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { fetchFoodItemsApiSlice } from "./features/fetchFoodItems/fetchFoodItemsApiSlice";
import { createOrderApiSlice } from "./features/createOrder/createOrderApiSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const combinedReducer = combineSlices(
  fetchFoodItemsApiSlice,
  createOrderApiSlice
);

// Create rootReducer with reset functionality
const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: any) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      // NOTE: should we start combining the middlewares that are similar in operation?
      return getDefaultMiddleware().concat(
        fetchFoodItemsApiSlice.middleware,
        createOrderApiSlice.middleware
      );
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
