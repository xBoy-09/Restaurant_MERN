import Food from "../Models/Food.js"
import mongoose from "mongoose"

// Get all FoodList
export async function getAllFood(req,res) {
    const n_food = await Food.find({}).sort({createdAt: -1})
    res.status(200).json(n_food)
}


// Get food with starting name
export async function getFood(req, res) {
    const { name } = req.body;

    // Use a regular expression to find documents containing the search query
    const result = await Food.find({ name: { $regex: name, $options: 'i' } });
    if (!result) {
        return res.status(404).json({ error: "No such food" });
    }
    res.status(200).json(result);

}

// Update Food Availibility
export async function updateFoodAvail(req,res) {
    
    const {name , avail} = req.body
    try {
        // Find the Food by name
        
        const u_food = await Food.findOneAndUpdate(
            { name: name },
            { available: avail },
            { new: true } // To return the updated document
        )
        if(!u_food) {
            return res.status(404).json({error: "No such Food"})
        }
        res.status(200).json(u_food)
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all available Food
export async function getAvailableFood(req, res) {
    try {
      const availableFood = await Food.find({ available: true }).sort({ createdAt: 1 })
      if(!availableFood) {
        return res.status(404).json({error: "No available food"})
      }
      res.status(200).json(availableFood);
    } catch (error) {
      console.error('Error getting available food:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
}


// Create a food item
export async function createFood(req, res) {
    const { name , description, category } = req.body;
    const avail = false;
    const validCategories = ['desi', 'valaiti'];

    try {
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }
        // Find the document with the highest item_id
        const latestFood = await Food.findOne().sort({ item_id: -1 });

        let id_food = 1;

        if (latestFood) {
            id_food = latestFood.item_id + 1;
        }

        // Create a new Food document
        const newFood = await Food.create({
            item_id: id_food,
            name: name,
            description: description,
            category: category,
            available: avail,
        });

        res.status(200).json(newFood);
    } catch (error) {
        console.error('Error creating food:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
