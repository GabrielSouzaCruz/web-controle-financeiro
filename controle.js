const form = document.getElementById('form');
const descImput = document.querySelector('#descricao');
const valorImput = document.querySelector('#montante');
const balancoH1 = document.querySelector('#balanco');
const receitaP = document.querySelector('#din-positivo');
const despesaP = document.querySelector('#din-negativo');
const transacoesUl = document.querySelector('#transacoes');
const chave_transacoes_ls = 'transacoes';
let transacoesSalvas = null;

// Inicia transações salvas
try {
    transacoesSalvas = JSON.parse(localStorage.getItem(chave_transacoes_ls));
} catch (error) {
    transacoesSalvas = [];
}

if (transacoesSalvas == null) {
    transacoesSalvas = [];
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Recuperar os valores
    const descTransacao = descImput.value.trim();
    const valorTransacao = valorImput.value.trim();

    // Validar os inputs
    if (descTransacao === "") {
        alert("A descrição da transação não pode ser vazia.");
        return;
    }
    if (valorTransacao === "") {
        alert("O valor da transação não pode ser vazio.");
        return;
    }

    let valorConvertido = parseFloat(valorTransacao);
    const isDespesa = document.querySelector('#tipo-despesa').checked;

    if (isDespesa) {
        valorConvertido = Math.abs(valorConvertido) * -1;
    } else {
        valorConvertido = Math.abs(valorConvertido);
    }

    let novoId = 0;
    if (transacoesSalvas.length > 0) {
        novoId = transacoesSalvas[transacoesSalvas.length - 1].id + 1;
    }

    const transacao = {
        id: novoId,
        descricao: descTransacao,
        valor: valorConvertido
    };

    somaAoSaldo(transacao);
    somaReceitaDespesa(transacao);
    addTransacaoAoDOM(transacao);

    descImput.value = "";
    valorImput.value = "";

    transacoesSalvas.push(transacao);
    localStorage.setItem(chave_transacoes_ls, JSON.stringify(transacoesSalvas));
});


// Métodos auxiliares
function somaAoSaldo(transacao) {
    const valorTransacao = transacao.valor;

    let total = balancoH1.innerHTML.replace("R$", "");
    total = parseFloat(total);
    total += valorTransacao;

    balancoH1.innerHTML = `R$${total}`;
}

function somaReceitaDespesa(transacao) {
    const elementoAlterado = transacao.valor > 0 ? receitaP : despesaP;
    const substituir = transacao.valor > 0 ? "+ R$" : "- R$";

    let valor = elementoAlterado.innerHTML.replace(substituir, "");
    valor = parseFloat(valor);

    const valorTransacao = transacao.valor;
    valor += Math.abs(valorTransacao);

    elementoAlterado.innerHTML = `${substituir}${valor}`;
}

function addTransacaoAoDOM(transacao) {
    const sinal = transacao.valor < 0 ? "-" : "";
    const classeCSS = transacao.valor < 0 ? "negativo" : "positivo";

    let valorTransacao = Math.abs(transacao.valor);
    const li = document.createElement('li');
    li.classList.add(classeCSS);

    li.innerHTML = `${transacao.descricao} 
                    <span>${sinal}R$${valorTransacao}</span>
                    <button class="delete-btn" 
                    onclick="deletaTransacao(${transacao.id}, this)">X</button>`;

    transacoesUl.append(li);
}

function carregarDados() {
    transacoesUl.innerHTML = "";
    balancoH1.innerHTML = "R$0.00";
    receitaP.innerHTML = "+ R$0.00";
    despesaP.innerHTML = "- R$0.00";

    for (let i = 0; i < transacoesSalvas.length; i++) {
        somaAoSaldo(transacoesSalvas[i]);
        somaReceitaDespesa(transacoesSalvas[i]);
        addTransacaoAoDOM(transacoesSalvas[i]);
    }
}


function deletaTransacao(idTransacao, elementoBotao) {
    const transacaoIndex = transacoesSalvas.findIndex(transacao => transacao.id == idTransacao);
    const transacaoRemovida = transacoesSalvas[transacaoIndex];

    transacoesSalvas.splice(transacaoIndex, 1);
    localStorage.setItem(chave_transacoes_ls, JSON.stringify(transacoesSalvas));

    elementoBotao.parentElement.remove();

    let total = balancoH1.innerHTML.replace("R$", "");
    total = parseFloat(total);
    total -= transacaoRemovida.valor;
    balancoH1.innerHTML = `R$${total}`;

    if (transacaoRemovida.valor > 0) {
        let valor = receitaP.innerHTML.replace("+ R$", "");
        valor = parseFloat(valor) - transacaoRemovida.valor;
        receitaP.innerHTML = `+ R$${valor}`;
    } else {

        let valor = despesaP.innerHTML.replace("- R$", "");
        valor = parseFloat(valor) - Math.abs(transacaoRemovida.valor);
        despesaP.innerHTML = `- R$${valor}`;
    }
}

carregarDados();