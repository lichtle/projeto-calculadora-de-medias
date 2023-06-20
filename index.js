const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji de gatinho feliz"/>'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji de gatinho triste"/>'

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  let linha = "<tr>"; // abrindo a tag de linha
  linha += `<td>${inputNomeAtividade.value}</td>`; // primeira coluna da linha
  linha += `<td>${inputNotaAtividade.value}</td>`; // segunda coluna da linha
  linha += `<td>${
    inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado
  }</td>`; // terceira coluna da linha
  linha += "</tr"; // fechando a tag de linha (inserção de 1 nova linha)

  const corpoTabela = document.querySelector("tbody");

  corpoTabela.innerHTML += linha;

  inputNomeAtividade.value = "" // limpando os campos de input após o submit
  inputNotaAtividade.value = ""
});
