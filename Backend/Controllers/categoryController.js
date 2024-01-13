const Category = require('../Models/categoryModel');

const fetchCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(201).send(categories);
    } catch (error) {
      res.status(500).send(error);
    }
  }

const fetchCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({category_id: id});
      res.status(201).send(category);
    } catch (error) {
      res.status(500).send(error);
    }
  }

module.exports = {
    fetchCategories,
    fetchCategory,
}