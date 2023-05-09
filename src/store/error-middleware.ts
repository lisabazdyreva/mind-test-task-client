import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import { APIErrorMessage } from "../utils/const.ts";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action.payload?.status === APIErrorMessage.Fetch) {
      console.warn(action.payload.error);
    } else if (action.payload?.status === APIErrorMessage.Parse) {
      console.warn(action.payload.error);
    } else if (isRejectedWithValue(action)) {
      console.warn(action.payload.data.message);
    }

    return next(action);
  };
