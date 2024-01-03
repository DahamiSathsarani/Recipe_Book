import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Register from './components/User Management/User Registration/Register';
import Login from './components/User Management/User Login/Login';
import Profile from './components/User Management/View Profile/Profile';
import UserDashboard from './Pages/UserDashboard';
import UpdateProfile from './components/User Management/Profile Update/UpdateProfile'
import AddRecipe from './components/Recipe Management/Add Recipe/AddRecipe';
import ViewRecipe from './components/Recipe Management/View Recipe/ViewRecipe';
import CategorizedRecipes from './components/Recipe Management/Categorized Recipes/CategorizedRecipes';

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/UserDashboard/Profile" element={<Profile />} />
          <Route path="/UserDashboard/Profile/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/UserDashboard/AddRecipe" element={<AddRecipe />} />
          <Route path="/UserDashboard/ViewRecipe" element={<ViewRecipe />} />
          <Route path="/CategorizedRecipes" element={<CategorizedRecipes />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
