export default function autenticar(req,res){
    const usuario = req.body.usuario;
    const senha = res.body.senha;
    if (usuario == 'admin' && senha == 'admin'){
        //usuario está autenticado
        res.redirect('/menu.html');
    }
    else
    {
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<title>Falha no login</title>');
        resposta.write('<meta charset="utf-8">');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<p>Usuário ou senha inválidos</p>');
        resposta.write('<a href="/login.html">Voltar para tela de login</a>');
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }

}