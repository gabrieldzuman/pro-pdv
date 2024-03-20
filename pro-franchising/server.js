const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your-secret-key';

app.use(bodyParser.json());

const users = [
  {
    id: 1,
    username: 'admin',
    password: '12345678',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: '87654321',
    role: 'user'
  }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, SECRET_KEY);
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
