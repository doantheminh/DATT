export interface IProduct {
    _id?: string,
    name: string,
    price: number,
    priceSale: number,
    describe: string,
    images?: string,
    categoryId: string,
    data?: string,
    status: boolean,
    quantity?: number,

}