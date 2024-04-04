const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv").config();

const userRoutes = require('./Routes/userRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
const ingredientRoutes = require('./Routes/ingredientRoutes');
const subscriptionRoutes = require('./Routes/subscriptionRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', recipeRoutes);
app.use('/', ingredientRoutes);
app.use('/', subscriptionRoutes);

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
        w: 'majority',
        wtimeout: 1000 // Specify your desired timeout in milliseconds
      }
})

//database connection
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("Database is connected");
});

//use port 3000 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
})