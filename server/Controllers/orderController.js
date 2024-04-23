import Order from "../Models/Order.js"

import mongoose from "mongoose"

export async function getOrders(req,res) {
    const n_order = await Order.find({ status : 'Pending'}).sort({createdAt: 1})

    res.status(200).json(n_order)
}

export async function addOrder(req,res) {
    const { cust_name, order_list } = req.body
    const status = 'Pending'
    try {
        const latestOrder = await Order.findOne().sort({ order_id: -1 });

        let id_Order = 1;

        if (latestOrder) {
            id_Order = latestOrder.order_id + 1;
        }


        const n_order = await Order.create({
            order_id: id_Order, 
            cust_name: cust_name,
            order_list: order_list, 
            status: status
        })
        res.status(200).json(n_order)
    } catch(error) {
        res.status(400).json({error: error.mssg})
    }
}

export async function completeOrder(req,res) {
    const {order_id} = req.body
    const status = 'Completed'
    try {
        const u_order = await Order.findOneAndUpdate(
            { order_id: order_id },
            { status: status },
            { new: true } // To return the updated document
        )
        if(!u_order) {
            return res.status(404).json({error: "No such Order"})
        }
        res.status(200).json(u_order)
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

export async function getAllOrders(req,res) {
    const n_order = await Order.find({}).sort({createdAt: -1})

    res.status(200).json(n_order)
}


export async function getUserOrder(req,res) {
    const { cust_name } = req.body
    const n_order = await Order.find({cust_name: cust_name}).sort({createdAt: -1})
    if(!n_order) {
        res.status(404).json({error: 'User has no orders'})
    } else {
        res.status(200).json(n_order)
    }

}