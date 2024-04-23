import User from '../Models/User.js';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Get all User
export async function getUsers(req,res) {
    const n_user = await User.find({}).sort({createdAt: -1})

    res.status(200).json(n_user)
}


// Get single User
export async function login(req,res) {
    const {username, password} = req.body

    const n_user = await User.findOne({ username: username });
    if(!n_user){
        console.log("User not found")
        return res.status(404).json({error: "No such User. Try Signing Up"})
    }
    
    const enteredPassword = password
    const hashedPassword = n_user.password

    try {
        const isPasswordValid = await bcrypt.compare(enteredPassword, hashedPassword);
      
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: "Internal server error" })
    }

    res.status(200).json(n_user);
}


// Create a User
export async function signup(req,res) {
    const {username, password, auth} = req.body
    // Add doc to db
    try {
        const f_user = await User.findOne({username: username})
        if(f_user){
            return res.status(404).json({error : 'Already Created'})
        }


        const n_user = await User.create({username, password, auth})
        res.status(200).json(n_user)
    } catch(error) {
        res.status(400).json({error: error.mssg})
    }
}

// Update a User
export async function updateUserAuth(req,res) {
    const {username, auth} = req.body
    try {
        // Find the user by username
        const u_user = await User.findOneAndUpdate(
            { username: username },
            { auth: auth },
            { new: true } // To return the updated document
        )
        if(!u_user) {
            return res.status(404).json({error: "No such staff"})
        }
        res.status(200).json(u_user)
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

// Delete a User
export async function deleteUser(req,res) {
    const {username} = req.body
    try {
        // Find the user by username
        const u_user = await User.findOneAndDelete({ username: username });
        if(!u_user) {
            return res.status(404).json({error: "No such staff"})
        }
        res.status(200).json(u_user)
    } catch (error) {
        console.error('Error Deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
