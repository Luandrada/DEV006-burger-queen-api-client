export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    dataEntry?: Date,
}
export interface ProductItemList {
    qty: number,
    product: Product,
}

export interface Order {
  userId: number,
  client: string,
  products: ProductItemList[],
  status: "pending" | "delivered",
}

export interface NewOrder {
  client: string,
  products: ProductItemList[]
}
