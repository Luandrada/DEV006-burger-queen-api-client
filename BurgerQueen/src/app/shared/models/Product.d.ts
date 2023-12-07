type menu = "Desayuno" | "Almuerzo";
export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: menu,
    dataEntry?: string,
}
export interface Item {
    qty: number,
    product: Product,
}

export type newOrder = {
  customer: string, 
  table:number, 
  items: {[key: number] : Item}
}
export interface Order {
  userId: number,
  table: number
  customer: string,
  items: {[key: number] : Item}
  status: "pending" | "delivered",
}
