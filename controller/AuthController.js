const bcrypt = require('bcrypt');
const authModel = require('../model/AuthModel');

//Account registration function
async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, email };
    await authModel.createUser(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//login account with email and password
async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user;

    if (email) {
      user = await authModel.getUserByEmail(email);
    } else {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//update profile function
async function updateProfile(req, res) {
  try {
    const { userId } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    await authModel.updateUser(userId, updates);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//Delete account function
async function deleteAccount(req, res) {
  try {
    const { userId } = req.params;
    await authModel.deleteUser(userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  updateProfile,
  deleteAccount
};