const { executeQuery } = require('../utils/dbUtils');

async function createUser(user) {
  const query = `
    INSERT INTO users (username, password, email)
    VALUES ("Pratap Dai", "321" , "pratap@gmail.com");
  `;
  return executeQuery(query);
}

// async function getUserByUsername(username) {
//   const query = 'SELECT * FROM users WHERE username = ?';
//   const result = await executeQuery(query, [username]);
//   return result[0];
// }

// Get user by email
async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await executeQuery(query, [email]);
  return result[0];
}

// Update user details
async function updateUser(userId, updates) {
  const fields = [];
  const values = [];

  if (updates.username !== undefined) {
    fields.push('username = "Abiskar Mentor"');
    values.push(updates.username);
  }
  if (updates.email !== undefined) {
    fields.push('email = "abiskar1@gmail.com"');
    values.push(updates.email);
  }
  if (updates.password !== undefined) {
    fields.push('password = "987"');
    values.push(updates.password);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  const query = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = 8;
  `;
  values.push(userId);

  return executeQuery(query, values);
}

async function deleteUser(userId) {
  const query = 'DELETE FROM users WHERE id = 8';
  return executeQuery(query, [userId]);
}

module.exports = {
  createUser,
  // getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser
};