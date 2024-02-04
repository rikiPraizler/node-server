
import mongoose from 'mongoose';
import { addOrderValidator, Order } from '../models/order.js';

export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find();
        res.json(allOrders);
    }
    catch (err) {
        res.status(500).send("an error occurred " + err.message);
    }
}

export const addOrder = async (req, res) => {
    let { forDate, address, arrProducts } = req.body;
    let idUser = req.user._id;
    if (!idUser)
        return res.status(400).send("an error occurred ");

    let validate = addOrderValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0].message);
    try {
        let existOrder = await Order.find({ forDate, address, idUser, arrProducts });
        if (existOrder.length > 0)
            return res.status(409).send("this order already exists");
        let newOrder = await Order.create({ dateOrder: Date.now(), forDate, address,userId: idUser, arrProducts, onTheWay: false });
        return res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400).send("unable to add this order " + err);
    }
}

export const deleteOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("code is not valid");
    try {
        let deletedOrder = await Order.findById(id);
        if (!deletedOrder)
            return res.status(404).send("there is no order with this code");
        if (deletedOrder.onTheWay == true)
            return res.status(400).send("the order is on the way");
        if (req.user._id != deletedOrder.userId && req.user.role != "ADMIN")
            return res.status(409).send("you can not delete this order")
        await Order.deleteOne(deletedOrder);
        return res.json(deletedOrder);
    }
    catch (err) {
        res.status(400).send("unable to delete this order " + err);
    }
}

export const updateOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("code is not valid");
    try {
        let order = await Order.findById(id);
        if (!order)
            return res.status(404).send("there is no order with this code");
        order.onTheWay = true;
        await order.save();
        return res.json(order);
    }
    catch (err) {
        return res.status(500).send("an error occurred " + err);
    }
}

export const getOrdersByUser = async (req, res) => {
    let { _id } = req.user;
    if (!_id)
        return res.status(400).send("an error occurred ");
    try {
        let orders = await Order.find({ userId: _id });
        return res.status(201).json(orders);
    }
    catch (err) {
        return res.status(500).send("an error occurred " + err);
    }
}
