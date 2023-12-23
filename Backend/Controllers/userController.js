const User = require('../Models/userModel');

const createUser = async (req, res) => {
  try {
    const {name, email, phone, nic, dob, password } = req.body;

    // Find the maximum id in user table
    const resultUser = await User.findOne({}, {}, { sort: { user_id: -1 } });
    
    const maxUserId = resultUser.user_id;
    const user_id = parseInt(maxUserId) + 1;

    // Create a new user
    const newUser = await User.create({ user_id, name, email, phone, nic, dob, role: 'USER', password, status: 'ACTIVE'});

    // Send a response indicating success
    res.status(201).send({ success: true, message: 'User created successfully.' });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error creating user:', error);
    res.status(400).send({ success: false, message: 'Error creating user.' });
  }
};

const fetchUser = async (req, res) => {
    try {
      const {email, password } = req.body;

      const user = await User.findOne({email: email});
      if (!user || user.status == 'INACTIVE') {
        return res.status(404).send('User not found');
      }
      else if (password == user.password) {
        // const user_id = mapping.user_id;
        // const user = await User.findOne({user_id: user_id});
        res.status(200).json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

const fetchUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(201).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

const updateUser = async (req, res) => {
    const {name, email, phone, nic, dob, password } = req.body;
    try {
        const student_before_update = await User.findOne({email: email});
        if (!student_before_update) {
          return res.status(404).send('User not found');
        }

        await User.findOneAndUpdate({email: email}, req.body, { new: true, runValidators: true });
        const user = await User.findOne({email: email})

        res.json({ success: true, user });

        } catch (error) {
            res.status(500).send(error);
        }
  }

const softDeleteUser = async (req, res) => {
  const {name, email, phone, nic, dob, password } = req.body;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { status: 'INACTIVE' } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send('Student not found');
      }
      res.json({ success: true, updatedUser });
    } catch (error) {
      res.status(500).send(error);
    }
  }

const deleteUser = async (req, res) => {
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
    createUser,
    fetchUser,
    fetchUsers,
    updateUser,
    softDeleteUser,
    deleteUser,
}