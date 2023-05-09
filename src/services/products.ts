import { api } from "./api";

import { IProduct, Products } from "../types/product.ts";
import { ApiMethod, ApiRoute } from "../utils/const.ts";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Products, void>({
      query: () => ({ url: ApiRoute.Products }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Products", id } as const)),
        { type: "Products" as const, id: "PRODUCTS" },
      ],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query(body) {
        return {
          url: ApiRoute.CreateProduct,
          method: ApiMethod.Post,
          body,
          formData: true,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
