const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Middleware para permitir solicitações de diferentes origens
app.use(cors());
// Middleware para analisar o corpo da solicitação como JSON
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

// Rota para autenticação do usuário
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Verifica se as credenciais são válidas
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  // Gera um token JWT com informações do usuário
  const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware para autenticar solicitações usando o token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  // Verifica se o token é válido
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Rota protegida que requer autenticação
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

// Rota de status
app.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Lidar com rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
