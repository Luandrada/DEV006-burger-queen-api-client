export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    dataEntry?: string,
}
export interface item {
    qty: number,
    product: Product,
}

export interface Order {
  userId: number,
  client: string,
  items: Map<string, item>
  status: "pending" | "delivered",
}