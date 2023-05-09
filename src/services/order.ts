import { api } from "./api";
import { ApiMethod, ApiRoute } from "../utils/const.ts";
import { IPostedOrder, IReceivedOrder } from "../types/order.ts";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postOrder: build.mutation<IReceivedOrder, IPostedOrder>({
      query(body) {
        return {
          url: ApiRoute.Order,
          method: ApiMethod.Post,
          body,
        };
      },
    }),
  }),
});

export const { usePostOrderMutation } = productsApi;
