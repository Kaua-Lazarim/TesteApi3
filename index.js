// index.js

// 1. Carregar as variáveis de ambiente (do arquivo .env)
// ESSA LINHA DEVE SER A PRIMEIRA DE TODAS
require('dotenv').config();

// 2. Importar as bibliotecas necessárias
const express = require('express');

// 3. Importar nossos arquivos de rotas ("especialistas")
const tuyaRoutes = require('./routes/tuya');
const goodweRoutes = require('./routes/goodwe_integration');
const authRoutes = require('./routes/auth_middleware'); // Não se esqueça das rotas de autenticação!

// 4. Inicializar o aplicativo Express
const app = express();
const port = process.env.PORT || 3001; // Usa a porta do Render ou 3001 localmente

// 5. Configurar "middlewares" (funções que rodam em todas as requisições)
app.use(express.json()); // Habilita o Express para entender corpos de requisição em JSON

// 6. "Conectar" as rotas importadas ao aplicativo principal
// Dizemos ao app para usar os arquivos de rota que criamos.
// Qualquer requisição que corresponda a uma rota dentro desses arquivos será direcionada para eles.
app.use('/', authRoutes);
app.use('/', tuyaRoutes);
app.use('/', goodweRoutes);

// 7. Criar uma rota de teste simples na raiz para verificar se a API está online
app.get('/', (req, res) => {
  res.send('API de Automação Solar está funcionando!');
});

// 8. Iniciar o servidor para ouvir por requisições
app.listen(port, () => {
  console.log(`Servidor rodando com sucesso na porta ${port}`);
});