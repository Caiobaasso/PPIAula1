console.log("evento.js carregado com sucesso.");
const formCadastroEvento = document.getElementById('formCadastroEvento');
formCadastroEvento.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3001/eventos';
buscarTodosEventos();

var motivoAcao = "CADASTRAR";


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

function selecionarEvento(cod,nome,descricao,data,local,preco,imagem,motivo){

    document.getElementById('codEvento').value = cod;
    document.getElementById('nomeEvento').value = nome;
    document.getElementById('descricaoEvento').value = descricao;
    document.getElementById('dataEvento').value = data;
    document.getElementById('localEvento').value = local;
    document.getElementById('precoEvento').value = preco;
    document.getElementById('enderecoImg').value = imagem;

    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');

    if (motivoAcao == "EDITAR"){
        botaoConfirmacao.innerText = 'EDITAR';
    }
    else if (motivoAcao == "EXCLUIR"){
        botaoConfirmacao.innerText = 'EXCLUIR';
    }

}
function excluirEvento(){
    fetch(enderecoAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cod: document.getElementById('codEvento').value})
    }).then((res) =>{
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
    });
}

function atualizarEvento(){
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
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((res) =>{
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
    });
}

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
        if (motivoAcao == "CADASTRAR"){
            gravaEvento();
        }
        else if (motivoAcao == "EDITAR"){
            atualizaEvento();   
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirEvento();
            motivoAcao = "CADASTRAR";
        }
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

function exibirEventos(listaEventos){
    if (listaEventos.length > 0){
        const divEventos = document.getElementById('listaEventos');
        const tabela = document.createElement('table');
        tabela.classList.add('table', 'table-dark', 'table-striped');
        const cabecalho = document.createElement('thead');
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
                <td><img src="${evento.imagem}" alt="${evento.nome}" style="width: 100px; height: auto;"></td>
                <td>
                    <button onclick="selecionarEvento('${evento.cod}','${evento.nome}',${evento.descricao}','${evento.data},'${evento.local}','${evento.preco}','${evento.imagem}','EDITAR')">Alterar</button>
                    <button onclick="selecionarEvento('${evento.cod}','${evento.nome}',${evento.descricao}','${evento.data},'${evento.local}','${evento.preco}','${evento.imagem}','EXCLUIR')">Excluir</button>
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
        exibirMensagem('Nenhum evento encontrado', 'red');
    }
}

function exibirMensagem(mensagem, cor = 'white'){
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style ='color: " + cor +";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


