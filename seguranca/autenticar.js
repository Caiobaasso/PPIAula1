export default function autenticar(req,res){
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario == 'admin' && senha == 'admin'){
        //usuario está autenticado
        res.redirect('/eventos.html');
    }
    else
    {
        res.redirect('/login.html?erro=1');
    }

}