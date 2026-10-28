const express = require('express');
const app = express();

app.use(express.json());

app.post('/registration', (req, res) => {
  const { name, email, password, gender } = req.body;
  const errors = [];

  if (!name) {
    errors.push('Name is required');
  } else if (name.trim().length < 3) {
    errors.push('Name must be at least 3 characters');
  }

  if (!email) {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Email is not valid');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!gender) {
    errors.push('Gender is required');
  } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
    errors.push('Gender must be male, female or other');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  res.status(201).json({ success: true, message: 'Registration done' });
});

app.listen(5000, () => {
  console.log('Server running');
});