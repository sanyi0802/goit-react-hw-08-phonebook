const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://sanyi0802.github.io',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/users/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  res.send('Registro exitoso');
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  res.send('Login exitoso');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
