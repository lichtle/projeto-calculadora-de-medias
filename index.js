const form = document.getElementById("form-atividade");
const imgAprovado =
  '<img src="./images/aprovado.png" alt="Emoji de gatinho feliz"/>'; // criando as variáveis imgAprovado e imgReprovado para 'hospedar' as imagens que iremos usar
const imgReprovado =
  '<img src="./images/reprovado.png" alt="Emoji de gatinho triste"/>';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // criando as variáveis spanAprovado e spanReprovado para 'hospedar' os textos que irão aparecer dependendo da situação do aluno (aprovado ou reprovado)
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima para a aprovação")); // criando um input para que a nota mínima para passar não seja um número pré-definido por nós, e sim um número inserido pelo próprio usuário

const atividades = []; // criando um array vazio de atividades a ser populado pela função adicionarLinha
const notas = []; // criando um array vazio de notas a ser populado pela função adicionarLinha
let linhas = ""; // criando uma string vazia de linhas a ser populada pela função adicionarLinha, a qual irá adicionar as atividades e notas acima (uma linha para cada submit)

form.addEventListener("submit", function (event) {
  event.preventDefault();

  adicionarLinha(); // Separando as funções por objetivo (adição de linha, atualização de tabela, cálculo de média e exibição do resultado final)
  atualizarTabela();
  calcularMedia();
  mostrarResultadoFinal();
});

function adicionarLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade"); // criando uma variável para o input correspondente ao nome da atividade
  const inputNotaAtividade = document.getElementById("nota-atividade"); // criando uma variável para o input correspondente à nota da atividade

  if (atividades.includes(inputNomeAtividade.value)) {
    // condicional para verificar se o valor inserido no input de nome de atividade já foi inserido
    alert(`A atividade "${inputNomeAtividade.value}" já foi inserida!`);
  } else {
    // caso o valor não tenha sido inserido, ele será colocado no array de atividades. Além disso também iremos popular o array de notas com o valor inserido pelo usuáro no input de notas:
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    // agora fazemos um passo a passo para adicionar todas as colunas de uma única linha:

    let linha = "<tr>"; // abrindo a tag de linha
    linha += `<td>${inputNomeAtividade.value}</td>`; // atualizando a tag com adição da primeira coluna da linha
    linha += `<td>${inputNotaAtividade.value}</td>`; // atualizando a tag com adição da segunda coluna da linha
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`; // atualizando a tag com adição da terceira coluna da linha
    linha += "</tr>"; // fechando a tag de linha (inserção de 1 nova linha contendo 3 colunas)

    linhas += linha; // atualizando a string de linhas com a nova linha criada acima. Esse processo se repete à cada adição do usuário (populando a string linhas criada no escopo global)
  }

  inputNomeAtividade.value = ""; // após o submit, limpan o campo correspondente ao input de nome da atividade 
  inputNotaAtividade.value = ""; // após o submit, limpan o campo correspondente ao input de nota
}

function atualizarTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas; // inserindo a string linhas (agora populada com as linhas criadas na função adicionarLinhas) dentro do corpo da tabela (tbody)
}

function calcularMedia() {
  /* Se dermos um console.log(notas), percebemos que o array de notas está sendo composto por strings, e não números. Para transformar os valores da string em números, utilizamos o método parseFloat() (para incluir números quebrados, ou ParseInt para números inteiros apenas) ao darmos push no array de notas */

  let somaDasNotas = 0; // variável que irá conter o valor final da soma. A inicializamos com o valor 0

  for (let i = 0; i < notas.length; i++) { // laço que itera sobre todos os itens do array notas, criado no escopo global e populado pela função adicionarLinha
    somaDasNotas += notas[i]; // a cada loop, a variável somaDasNotas é atualizada com seu próprio valor + valor atual (notas[i])
  }

  return somaDasNotas / notas.length; // retorna a média dos valores, dividindo o valor final da soma pelo tamanho do array de notas (média = soma dos valores / quantidade de valores)
}

function mostrarResultadoFinal() { // criando uma função para exibir se o aluno foi aprovado ou reprovado
  const media = calcularMedia().toFixed(1); // criando uma variável media para armazenar o resultado da função calcularMedia. O método toFixed faz com que o resultado, por mais que tenha mais de uma casa decimal, exiba apenas 1 casa decimal

  document.getElementById("valor-media").innerHTML = media; // exibe o valor da média calculada acima na tabela criada no HTML
  document.getElementById("resultado").innerHTML =
    media >= notaMinima ? spanAprovado : spanReprovado; // cria uma condicional (através do operador ternário): se a média for maior ou igual à notaMinima (input dado pelo usuário ao iniciar o programa), então exibe a imagem de aprovado (armazenada na variável spanAprovado, criada no escopo global). Se não, exibe a imagem de reprovado (armazenada na variável spanReprovado, criada no escopo global
}
