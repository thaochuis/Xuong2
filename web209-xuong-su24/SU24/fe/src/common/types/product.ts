export interface IProduct {
    _id?: number | string
    image: "";
    name: string
    category?: string
    price: number
    description?: string
    discount?: number
    featured?: boolean
    countInStock?: number
}
