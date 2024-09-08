import express from 'express';
import autenticar from './seguranca/autenticar.js';

const host = '0.0.0.0'; //todas as interfaces de rede disponiveis
const port = 3000;
const app = express();

//a biblioteca qs será utilizada para tratar os parâmetros da requisição
app.use(express.urlencoded({extended: true}));

app.use(express.static('./publico'));
app.use(express.static('./privado'));

//endpoint http://localhost:3000/login
app.get('./login', (req,res)=> {
    res.redirect('/login.html');
});

app.post('./login', autenticar);


//listen = escutar por requisições dos usuários
app.listen(port,host, () => {
    console.log(`Servidor rodando em http:// ${host}:${port}`);
})