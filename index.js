import express from 'express';

const host = '0.0.0.0'; //todas as interfaces de rede disponiveis
const port = 3000;
const app = express();

app.use(express.static('./publico'));

//listen = escutar por requisições dos usuários
app.listen(port,host, () => {
    console.log(`Servidor rodando em http:// ${host}:${port}`);
})