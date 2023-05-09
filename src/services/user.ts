import { api } from "./api";
import { ApiMethod, ApiRoute } from "../utils/const.ts";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<void, { userId: string }>({
      query(body) {
        return {
          url: ApiRoute.User,
          method: ApiMethod.Post,
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    removeUser: build.mutation<void, { userId: string | null }>({
      query(body) {
        return {
          url: ApiRoute.User,
          method: ApiMethod.Delete,
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useCreateUserMutation, useRemoveUserMutation } = userApi;
