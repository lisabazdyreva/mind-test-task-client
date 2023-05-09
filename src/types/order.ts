export interface IPostedOrder {
  userId: string | null;
  customer_phone: string;
  sum: number;
}

export interface IReceivedOrder {
  userId: string | null;
  customer_phone: string;
  id: number;
}
