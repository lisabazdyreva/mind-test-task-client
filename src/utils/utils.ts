import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  const errorStr = JSON.parse(JSON.stringify(error));

  if (errorStr.status === "FETCH_ERROR") {
    return "Server is not respond";
  } else if (errorStr.status === "PARSING_ERROR") {
    return "Error in request or response. Try later.";
  } else {
    return errorStr.data.message;
  }
};
