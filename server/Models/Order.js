import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    order_id: {
        type: Number,
        required: true
    },
    cust_name: {
        type: String,
        required: true
    },
    order_list: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true,
        enum : ['Pending', 'Completed']
    }
}, { timestamps: true });

// Correct export statement
const Order = mongoose.model('Order', orderSchema);

export default Order;
