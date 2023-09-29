const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/mevn-stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida.');
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('jsonFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const jsonData = JSON.parse(req.file.buffer.toString('utf8'));

  // Salve os dados JSON no banco de dados ou faça o processamento desejado aqui

  return res.json(jsonData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
