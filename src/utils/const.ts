export const Route = {
  Products: "/products",
  Cart: "/cart",
  ProductsCreate: "/products/create",
} as const;

export const InfoStatusMessage = {
  Loading: "Loading...",
  Error: "Some error occurred. Try later.",
  Removing: "Removing...",
  Sending: "Sending...",
} as const;

export const InfoContentMessage = {
  EmptyProducts: "No products added.",
  CreatedProduct: "Product successfully created.",
  PostedOrder: "Order was successfully posted.",
  EmptyCart:
    "Please, fill the phone number and add products to post your order",
} as const;

export const Quantity = {
  Max: 50,
  Min: 1,
};

export const APIErrorMessage = {
  Fetch: "FETCH_ERROR",
  Parse: "PARSING_ERROR",
} as const;

export const ApiRoute = {
  Base: "https://mind-test-task.onrender.com/api",
  CartItem: "/cart-item",
  Cart: "/cart",
  Order: "/order",
  Products: "/products",
  CreateProduct: "/products/create",
  User: "/user",
} as const;

export const ApiMethod = {
  Post: "POST",
  Delete: "DELETE",
  Patch: "PATCH",
} as const;
