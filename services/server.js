const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors()); //CORS para permitir todas as origens 
app.use(express.json());

//multer para lidar com o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//endpoint para o upload do arquivo JSON
app.post('/upload', upload.single('jsonFile'), (req, res) => {
  // Verificando se um arquivo foi enviado
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
  }

  // O conteúdo do arquivo está disponível em req.file.buffer como um buffer
  const fileBuffer = req.file.buffer;

  // Convertendo buffer em uma string JSON (assumindo que o arquivo é JSON)
  const jsonString = fileBuffer.toString('utf8');

  try {
    //parse da string JSON em um objeto JavaScript
    const jsonData = JSON.parse(jsonString);

    // Agora você pode fazer o que quiser com os dados JSON
    // Por exemplo, salvar no banco de dados, processar, etc.

    return res.status(200).json({ message: 'Arquivo JSON recebido com sucesso.' });
  } catch (error) {
    console.error('Erro ao fazer o parse do JSON:', error);
    return res.status(400).json({ message: 'Erro ao fazer o parse do JSON.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
