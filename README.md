# 💰 Controle Financeiro

Um aplicativo web simples e intuitivo para ajudar no controle de finanças pessoais. Com ele, você pode registrar suas receitas e despesas, e o sistema calcula automaticamente o seu saldo atual.

## 🚀 Funcionalidades

* **Adicionar Transações:** Insira o nome e o valor da transação.
* **Seleção de Tipo:** Escolha facilmente se a transação é uma **Receita** ou uma **Despesa** através de opções visuais (Radio Buttons).
* **Cálculo Automático:** O aplicativo atualiza instantaneamente o Saldo Total, Total de Receitas e Total de Despesas.
* **Exclusão Otimizada:** É possível apagar uma transação clicando no botão "X". A interface e os valores são atualizados na hora, sem precisar recarregar a página inteira.
* **Armazenamento Local:** Seus dados não são perdidos ao fechar a página! O projeto utiliza o `localStorage` do navegador para salvar seu histórico de transações.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as tecnologias bases da web:

* **HTML5:** Estruturação da página e formulários.
* **CSS3:** Estilização visual, layout em grid/flexbox e responsividade.
* **JavaScript (Vanilla):** Lógica de programação, manipulação do DOM e integração com o Web Storage.

## 💡 Melhorias Recentes (Versão 2)

O projeto recebeu as seguintes atualizações para melhorar a experiência do usuário e a performance do código:
1. **IDs Sequenciais:** As transações agora recebem identificadores lógicos e incrementais (começando em 0).
2. **Usabilidade do Formulário:** Substituição da entrada manual de números negativos por botões de seleção (Receita/Despesa).
3. **Performance na Exclusão:** Ao deletar um item, o sistema remove apenas o elemento visual específico e recalcula os valores matematicamente, poupando processamento ao não recarregar toda a lista do Local Storage.

## 💻 Como Executar o Projeto

Como é um projeto focado em Front-end (lado do cliente) sem necessidade de um servidor complexo, rodar o projeto é muito simples:

1. Faça o download ou clone este repositório.
2. Extraia os arquivos em uma pasta no seu computador.
3. Dê um duplo clique no arquivo `index.html`.
4. O projeto abrirá no seu navegador padrão e já estará pronto para uso!
