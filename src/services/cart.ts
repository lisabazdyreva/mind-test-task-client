import { api } from "./api.ts";
import { Cart, CartItems, ICart, ICartItem } from "../types/cart-item.ts";
import { ApiMethod, ApiRoute } from "../utils/const.ts";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation<ICartItem, Partial<ICartItem>>({
      query(body) {
        return {
          url: ApiRoute.CartItem,
          method: ApiMethod.Post,
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation<
      ICart,
      { userId: string | null; cartItemId: number }
    >({
      query(body) {
        return {
          url: ApiRoute.CartItem,
          method: ApiMethod.Delete,
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateQuantity: build.mutation<
      ICart,
      { cartItemId: number; quantity: number; userId: string | null }
    >({
      query(body) {
        return {
          url: ApiRoute.CartItem,
          method: ApiMethod.Patch,
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getCart: build.query<Cart, string | null>({
      query: (userId) => {
        return { url: ApiRoute.Cart, params: { userId } };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Cart", id } as const)),
        { type: "Cart" as const, id: "Cart" },
      ],
    }),
    removeCart: build.mutation<CartItems, { userId: string | null }>({
      query(body) {
        return {
          url: ApiRoute.Cart,
          method: ApiMethod.Delete,
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
  useGetCartQuery,
  useRemoveCartMutation,
} = cartApi;
