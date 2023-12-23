// const multer = require('multer');
// const {v4: uuidv4} = require('uuid');
// const path = require('path');
const { Readable } = require('stream');
const cloudinary = require('../Configure/cloudinaryConfig');
const Recipe = require('../Models/recipeModel');
const Category = require('../Models/categoryModel');
const Ingredient = require('../Models/ingredientModel');
const Recipe_Ingredient_Mapping = require('../Models/recipe_ingredientModel');
const Step = require('../Models/stepModel');
const Recipe_Step_Mapping = require('../Models/recipe_stepModel');

const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, description, category_name, userId } = req.body;
    
    const user_id = userId;
    
    // Parse the ingredients JSON string into an array
    const parsedIngredients = JSON.parse(ingredients);

    // Parse the description JSON string into an array
    const parsedDescription = JSON.parse(description);

    // Find the maximum id in the recipes table
    const resultRecipe = await Recipe.findOne({}, {}, { sort: { recipe_id: -1 } });

    let recipe_id;

    if (resultRecipe && resultRecipe.recipe_id) {
      const maxRecipeId = resultRecipe.recipe_id;
      recipe_id = parseInt(maxRecipeId) + 1;
    } else {
      recipe_id = 1;
    }

    // Upload the image to Cloudinary
    let imgUrl;
    if (req.file) {
      const { originalname: imageName, buffer: imageBuffer } = req.file;

      try {
        const cloudinaryUploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'recipe_images', public_id: imageName },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
    
          const imageStream = new Readable();
          imageStream.push(imageBuffer);
          imageStream.push(null);
    
          imageStream.pipe(uploadStream);
        });
    
        imgUrl = cloudinaryUploadResult.secure_url;
      }catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(400).send({ success: false, message: 'Error uploading image.' });
      }
    };

    // Find category_id by category_name
    const category = await Category.findOne({ category_name: category_name });
    const category_id = category.category_id;

    // Create a new ingredient
    for (const ingredient of parsedIngredients) {
      const existingIngredient = await Ingredient.findOne({ ingredient_name: ingredient.name });
      const quantity = ingredient.quantity;
      const unit = ingredient.unit;

      let ingredient_id;

      if (!existingIngredient) {
        // Find the maximum id in the ingredients table
        const resultIngredient = await Ingredient.findOne({}, {}, { sort: { ingredient_id: -1 } });

        if (resultIngredient && resultIngredient.ingredient_id) {
          const maxIngredientId = resultIngredient.ingredient_id;
          ingredient_id = parseInt(maxIngredientId) + 1;
        } else {
          ingredient_id = 1;
        }

        const newIngredient = await Ingredient.create({
          ingredient_id,
          ingredient_name:ingredient.name,
        });
      } else{
          ingredient_id = existingIngredient.ingredient_id;
      }

      // Find the maximum id in the recipe_ingredient_mapping table
      const resultRecipe_Ingredient = await Recipe_Ingredient_Mapping.findOne({}, {}, { sort: { mapping_id: -1 } });
      let recipe_ingredient_mapping_id;

      if (resultRecipe_Ingredient && resultRecipe_Ingredient.mapping_id) {
        const maxRecipe_IngredientId = resultRecipe_Ingredient.mapping_id;
        recipe_ingredient_mapping_id = parseInt(maxRecipe_IngredientId) + 1;
      } else {
        recipe_ingredient_mapping_id = 1;
      }

      // Create a new recipe_ingredient_mapping
      const recipe_ingredient_mapping = await Recipe_Ingredient_Mapping.create({ mapping_id: recipe_ingredient_mapping_id, recipe_id, ingredient_id, quantity, unit });

    }

    // Create a new step
    for(const step of parsedDescription) {
      // Find the maximum id in the step table
      const resultStep = await Step.findOne({}, {}, { sort: { step_id: -1 } });

      if (resultStep && resultStep.step_id) {
        const maxStepId = resultStep.step_id;
        step_id = parseInt(maxStepId) + 1;
      } else {
        step_id = 1;
      }

      const newStep = await Step.create({ step_id, step });

      // Find the maximum id in the recipe_step_mapping table
      const resultRecipe_Step = await Recipe_Step_Mapping.findOne({}, {}, { sort: { mapping_id: -1 } });
      let recipe_step_mapping_id;

      if (resultRecipe_Step && resultRecipe_Step.mapping_id) {
        const maxRecipeStepId = resultRecipe_Step.mapping_id;
        recipe_step_mapping_id = parseInt(maxRecipeStepId) + 1;
      } else {
        recipe_step_mapping_id = 1;
      }

      const newRecipeStepMapping = await Recipe_Step_Mapping.create({ mapping_id: recipe_step_mapping_id, recipe_id, step_id });

    }

    // Create a new recipe
    const newRecipe = await Recipe.create({ recipe_id, title, imgUrl, category_id, user_id });

    res.status(201).send({ success: true, message: 'Recipe created successfully.', newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).send({ success: false, message: 'Internal server error.' });
  }
};

const fetchRecipe = async (req, res) => {
    try {
      const { recipe_id } = req.body;
      console.log(recipe_id);
      const recipe = await Recipe.findOne({recipe_id: recipe_id});
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
      else {
        try {
          const ingredients = await Recipe_Ingredient_Mapping.find({ recipe_id: recipe_id });
          console.log(ingredients);
        } catch (error) {
          console.error(error);
        }
        res.status(200).json({ success: true, recipe });
      }
    
    } catch (error) {
      res.status(500).send(error);
    }
  }

const fetchRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(201).send(recipes);
    } catch (error) {
      res.status(500).send(error);
    }
  }

const updateRecipe = async (req, res) => {
    const {name, email, phone, nic, dob, password } = req.body;
    try {
        const student_before_update = await User.findOne({email: email});
        if (!student_before_update) {
          return res.status(404).send('User not found');
        }

        await User.findOneAndUpdate({email: email}, req.body, { new: true, runValidators: true });
        const student_after_update = await User.findOne({email: email})

        res.send(student_after_update);

        } catch (error) {
            res.status(500).send(error);
        }
  }

const softDeleteRecipe = async (req, res) => {
    const id = req.params.id;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { user_id: id },
        { $set: { status: 'INACTIVE' } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send('Student not found');
      }
      res.send('Successfully deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  }

const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    try {
      const deletedUser = await User.findOneAndDelete({user_id: id});
      if (!deletedUser) {
        return res.status(404).send('Student not found');
      }
      res.send('Successfully deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  }

module.exports = {
    createRecipe,
    fetchRecipe,
    fetchRecipes,
    updateRecipe,
    softDeleteRecipe,
    deleteRecipe,
}