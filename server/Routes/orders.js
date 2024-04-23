import express from "express";
import {
    getAllOrders,
    getOrders,
    addOrder,
    completeOrder,
    getUserOrder
} from '../Controllers/orderController.js'


const Orders = express.Router()

Orders.get('/get-all', getAllOrders)


Orders.get('/get-orders', getOrders)


Orders.post('/add-order', addOrder)


Orders.patch('/complete-order', completeOrder)

Orders.post('/get-user-order', getUserOrder)


export default Orders