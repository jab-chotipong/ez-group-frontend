export type Product = {
  id: string
  name: string
  price: number
  stock: number
  status: ProductStatus
}

export enum ProductStatus {
  INSTOCK = 'IN-STOCK',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}
