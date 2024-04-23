import express from 'express';
import Staff from '../Models/Staff.js';
import { 
    createStaff,
    getStaffs,
    getSingleStaff,
    deleteStaff,
    updateStaff
 } from '../Controllers/staffController.js'

const staffs = express.Router()

// Get all staffs
staffs.get('/', getStaffs)

// Get single staff
staffs.get('/:id', getSingleStaff)

// Post a staff
staffs.post('/', createStaff)

// Delete a staff
staffs.delete('/:id', deleteStaff)

// Update a staff
staffs.patch('/:id', updateStaff)



// export default staffs
export default staffs;