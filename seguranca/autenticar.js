export default function autenticar(req,res){
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario == 'admin' && senha == 'admin'){
        //usuario está autenticado
        req.session.autenticado = true;
        res.redirect('/eventos.html');
    }
    else
    {
        res.redirect('/login.html?erro=1');
    }
}
export function verificarAutenticacao(req,res, executaProximoPasso){
    if (req.session.autenticado != undefined && req.session.autenticado){
        executaProximoPasso();
    }
    else
    {
        res.redirect('/login.html');
    }
}
