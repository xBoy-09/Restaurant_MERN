import mongoose from 'mongoose';

const { Schema } = mongoose;

const staffSchema = new Schema({
    person_id: {
        type: Number,
        required: true
    },
    staff_id: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager']
    }
}, { timestamps: true });

// Correct export statement
const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
