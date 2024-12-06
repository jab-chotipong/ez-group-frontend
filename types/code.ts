export type Code = {
  id: string | number
  discount: number
  code: string
  status: CodeStatus
  createdAt?: Date
  expiredAt?: Date
}

export enum CodeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
