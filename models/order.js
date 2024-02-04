import mongoose from "mongoose";
import Joi from "joi";


const minimalBagSchema = mongoose.Schema({
    company: String,
    color: String,
    price: Number,
    size: { type: String, default: "M" },
    imgUrl: { type: String, default: 'img1.webp' },
    count: { type: Number, default: 1 }
})


const orderSchema = mongoose.Schema({
    dateOrder: { type: Date, default: Date.now() },
    forDate: Date,
    address: String,
    userId: String,
    arrProducts: [minimalBagSchema],
    onTheWay: { type: Boolean, default: false }
})

export const Order = mongoose.model("orders", orderSchema);

export const addOrderValidator = (orderToValidate) => {
    let addOrderJoi = Joi.object({
        forDate: Joi.date().required(),
        address: Joi.string().required(),
        arrProducts: Joi.array().items(Joi.object({
            company: Joi.string().min(2).max(15).required(),
            color: Joi.string().required(),
            price: Joi.number().required(),
            count: Joi.number().min(1),
            size: Joi.string()

        })).required(),
    }).unknown()
    return addOrderJoi.validate(orderToValidate);
} 