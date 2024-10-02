
const formCadastroEvento = document.getElementById('formCadastroEvento');
formCadastroEvento.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3001/eventos';
buscarTodosEventos();


function gravaEvento(){
    const objetoEvento = {
        cod: document.getElementById('codEvento').value,
        nome: document.getElementById('nomeEvento').value,
        descricao: document.getElementById('descricaoEvento').value,
        data: document.getElementById('dataEvento').value,
        local: document.getElementById('localEvento').value,
        preco: document.getElementById('precoEvento').value,
        imagem: document.getElementById('enderecoImg').value
    }
    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((res) => {
        return res.json();
    }).then((resAPI) => {
        if (resAPI.status == true){
            exibirMensagem(resAPI.mensagem, 'green');
        }
        else {
            exibirMensagem(resAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem('Erro: ' + erro, 'yellow');
    })

}

function excluirEvento(){}

function atualizarEvento(){}

function buscarTodosEventos(){
    fetch(enderecoAPI, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .then((resAPI) => {
        if (resAPI.status == true){
            exibirEventos(resAPI,listaEventos);
        }
        else{
            exibirMensagem(resAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem('Erro: ' + erro, 'yellow');
    });
}

function validarCampos(evento){

    const cod = document.getElementById('codEvento').value;
    const nome = document.getElementById('nomeEvento').value;
    const descricao = document.getElementById('descricaoEvento').value;
    const data = document.getElementById('dataEvento').value;
    const local = document.getElementById('localEvento').value;
    const preco = document.getElementById('precoEvento').value;
    const imagem = document.getElementById('enderecoImg').value;
    
    evento.stopPropagation();
    evento.preventDefault();

    if (cod && nome && descricao && data && local && preco && imagem){
        gravaEvento(); 
        formCadastroEvento.reset();
        buscarTodosEventos();
        return true;
    }
    else{
        exibirMensagem('Por favor preencha todos os campos do formulario.');
        return false;
    }
}

function exibirMensagem(mensagem, cor = 'white'){
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style ='color: " + cor +";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

function exibirEventos(listaEventos){
    if (listaEventos.length > 0){
        const divEventos = document.getElementById('listaEventos');
        const tabela = document.createElement('table');
        const cabecalho = documento.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Local</th>
                <th>Preço</th>
                <th>Imagem</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos)
        {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.cod}</td>
                <td>${evento.nome}</td>
                <td>${evento.descricao}</td>
                <td>${evento.data}</td>
                <td>${evento.local}</td>
                <td>${evento.preco}</td>
                <td>${evento.imagem}</td>
                <td>
                    <button >Alterar</button>
                    <button >Excluir</button>
                </td>

            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        divEventos.innerHTML="";
        divEventos.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum evento encontrado');
    }
}


