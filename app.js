'use strict';

const getGuardaDados = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setGuardaDados = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

const criaUmItem = (tarefa, status, indice) => {
    const item  = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

/* ------------------------------------------------------------------------------ */

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla == 'Enter'){
        const banco = getGuardaDados();
        banco.push ({'tarefa': texto, 'status': ''});
        setGuardaDados(banco);
        atualizaTela();

        // evento.target.value = '' LIMPA A CAIXA DE TEXTO;
        evento.target.value = '';
    }
}

document.getElementById('novoItem').addEventListener('keypress', inserirItem);

/* ------------------------------------------------------------------------------ */
const removerItem = (indice) => {
    const banco = getGuardaDados();
    banco.splice (indice, 1);
    setGuardaDados(banco);
    atualizaTela();
}

const atualizaItem = (indice) => {
    const banco = getGuardaDados();
    guardaDados[indice].status = banco[indice].status == '' ? 'checked' : '';
    setGuardaDados(banco);
    atualizaTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizaTela (indice);
    }
}

document.getElementById('todoList').addEventListener('click', clickItem);

/* ------------------------------------------------------------------------------ */
const atualizaTela = () => {
    limparTarefas();
    const guardaDados = getGuardaDados();
    guardaDados.forEach( (item, indice)=> criaUmItem (item.tarefa, item.status, indice));
}

atualizaTela();