import express from 'express';
import autenticar from './seguranca/autenticar.js';
import { verificarAutenticacao} from './seguranca/autenticar.js';
import session from 'express-session';

const host = '0.0.0.0'; //todas as interfaces de rede disponiveis
const port = 3000;
const app = express();

//a biblioteca qs será utilizada para tratar os parâmetros da requisição
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'segredo', //chave para criptografia
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 15
    }
}));

app.use(express.static('./publico'));

//endpoint http://localhost:3000/login
app.get('/login', (req,res)=> {
    res.redirect('./login.html');
});

app.post('/login', autenticar);

app.use(verificarAutenticacao, express.static('./privado'));

//listen = escutar por requisições dos usuários
app.listen(port,host, () => {
    console.log(`Servidor rodando em http:// ${host}:${port}`);
})