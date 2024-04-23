import Staff from '../Models/Staff.js';
import mongoose from 'mongoose'

// Get all Staffs
export async function getStaffs(req,res) {
    const n_staffs = await Staff.find({}).sort({createdAt: -1})

    res.status(200).json(n_staffs)
}


// Get single Staff
export async function getSingleStaff(req,res) {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Staff"})
    }

    const n_staff = await Staff.findById(id)
    if(!n_staff){
        return res.status(404).json({error: "No such Workout"})
    }

    res.status(200).json(n_staff)
}


// Create a Staff
export async function createStaff(req,res) {
    const {person_id, staff_id, position} = req.body
    // Add doc to db
    try {
        const n_staff = await Staff.create({person_id, staff_id, position})
        res.status(200).json(n_staff)
    } catch(error) {
        res.status(400).json({error: error.mssg})
    }
}

// Delete a Staff

export async function deleteStaff(req,res) {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such staff"})
    }
    const d_staff = await Staff.findOneAndDelete({_id: id})
    if(!d_staff) {
        return res.status(404).json({error: "No such staff"})
    }
    res.status(200).json(d_staff)
}


// Update a Staff
export async function updateStaff(req,res) {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such staff"})
    }
    const u_staff = await Staff.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if(!u_staff) {
        return res.status(404).json({error: "No such staff"})
    }
    res.status(200).json(u_staff)
}


