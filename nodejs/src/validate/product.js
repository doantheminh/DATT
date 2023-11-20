import joi from "joi";


export const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    priceSale: joi.number().required(),
    describe: joi.string().required(),
    images: joi.string().required(),
    categoryId: joi.string().required(),
    status: joi.boolean().required(),

});