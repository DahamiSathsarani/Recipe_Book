const Category = require('../Models/categoryModel');

const fetchCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(201).send(categories);
    } catch (error) {
      res.status(500).send(error);
    }
  }

module.exports = {
    fetchCategories
}