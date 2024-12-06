export type Order = {
  id: number
  customerId: number
  fullname: string
  products: OrderProduct[]
  totalPrice: string | number
  redemptionCode: string | null
  status: OrderStatus
}

export type OrderProduct = {
  id: number
  name: string
  quantity: number
}

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
