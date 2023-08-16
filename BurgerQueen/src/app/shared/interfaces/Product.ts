export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    dataEntry?: Date,
}
export interface ProductItemList {
    id: number,
    name: string,
    price: number,
    cantidad: number
}