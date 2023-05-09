import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { ApiRoute } from "../utils/const.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: ApiRoute.Base,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Products", "Cart", "CartItems"],
  endpoints: () => ({}),
});
