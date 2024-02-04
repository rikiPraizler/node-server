import mongoose from "mongoose";
import Joi from "joi";

const bagSchema = mongoose.Schema({
    company: String,
    description: String,
    color: String,
    price: Number,
    size: { type: String, default: "M" },
    length: Number,
    width: Number,
    height: Number,
    generateDate: { type: Date, default: Date.now() },
    imgUrl:{type: String,default:'img1.webp' }
   
})

export const Bag = mongoose.model("bags", bagSchema);

export const bagValidator = (bagToValidate) => {
    let bagJoi = Joi.object({
        company: Joi.string().min(2).max(15).required(),
        description: Joi.string(),
        color: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().default("M"),
        length: Joi.number(),
        width: Joi.number(),
        height: Joi.number(),
        generateDate: Joi.date().default(Date.now()),
        imgUrl:Joi.string().default('img1.webp')
    }).unknown()
    return bagJoi.validate(bagToValidate);
}