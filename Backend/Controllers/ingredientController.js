const Ingredient = require('../Models/ingredientModel');

const fetchIngredients = async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
      res.status(201).send(ingredients);
    } catch (error) {
      res.status(500).send(error);
    }
  }

module.exports = {
  fetchIngredients
}