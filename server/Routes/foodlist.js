import express from 'express';
import { getAllFood,
         getFood,
        getAvailableFood,
        updateFoodAvail,
        createFood
} from '../Controllers/foodlistController.js';

const Foods = express.Router()

// Get all Food
Foods.get('/foods', getAllFood)


// Search Food
Foods.post('/search%food', getFood)


// Update food availability
Foods.patch('/update%food', updateFoodAvail)


// Get Menu
Foods.get('/get%menu', getAvailableFood)

// Create Food
Foods.post('/foods', createFood)


export default Foods