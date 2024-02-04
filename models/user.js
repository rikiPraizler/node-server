import mongoose from "mongoose";
import Joi from "joi";


const userSchema = mongoose.Schema({
    userName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "USER" },
    enterDate: { type: Date, default: Date.now() }
}, { timeStamps: true })

export const User = mongoose.model("users", userSchema);
 
export const addUserValidator = (userToValidate) => {
    let addUserJoi = Joi.object({
        userName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().regex(/^(?=(?:\D*\d){2})(?=(?:[^a-zA-Z]*[a-zA-Z]){4})/).messages({
            'string.pattern.base': 'Password must contain at least  4 letters and 2 digits',
        })
    }).unknown();
    return addUserJoi.validate(userToValidate);
}
export const loginUserValidator = (userToValidate) => {
    let loginUserJoi = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().regex(/^(?=(?:\D*\d){2})(?=(?:[^a-zA-Z]*[a-zA-Z]){4})/).messages({
            'string.pattern.base': 'Password must contain at least  4 letters and 2 digits',
        })
    }).unknown();
    return loginUserJoi.validate(userToValidate);
}