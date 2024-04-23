import mongoose from 'mongoose';

const { Schema } = mongoose;

const foodSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['desi', 'valaiti']
    },
    available: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

// Correct export statement
const Food = mongoose.model('Food', foodSchema)

export default Food