import express from 'express'
import User from '../Models/User.js'

import {
    getUsers,
    login,
    signup,
    updateUserAuth,
    deleteUser
} from '../Controllers/userController.js'

const Users = express.Router()

// Get single User
Users.get('/getAll', getUsers)

// Get all User
Users.post('/login', login)

// Create a User
Users.post('/',signup)

//Update a User Auth
Users.post('/update',updateUserAuth)

Users.post('/delete', deleteUser)

export default Users;