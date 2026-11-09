
const campoTarefa = document.querySelector("#campoTarefa");
const botaoAdicionar = document.querySelector("#botaoAdicionar");
const listaTarefas = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");

function atualizarContador() {
  const pendentes = document.querySelectorAll("#listaTarefas li:not(.feita)").length;

  if (pendentes === 1) {
    contador.textContent = "1 tarefa pendente";
  } else {
    contador.textContent = pendentes + " tarefas pendentes";
  }
}

function salvarTarefas() {
  const tarefas = [];

  document.querySelectorAll("#listaTarefas li").forEach(function (item) {
    tarefas.push({
      texto: item.querySelector("span").textContent,
      feita: item.classList.contains("feita")
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarTarefa(texto, feita) {
  const item = document.createElement("li");

  const textoTarefa = document.createElement("span");
  textoTarefa.textContent = texto;

  const botaoApagar = document.createElement("button");
  botaoApagar.textContent = "×";
  botaoApagar.classList.add("botaoApagar");

  item.appendChild(textoTarefa);
  item.appendChild(botaoApagar);

  if (feita) {
    item.classList.add("feita");
  }

  item.addEventListener("click", function () {
    item.classList.toggle("feita");
    atualizarContador();
    salvarTarefas();
  });

  botaoApagar.addEventListener("click", function (evento) {
    evento.stopPropagation();
    item.remove();
    atualizarContador();
    salvarTarefas();
  });

  return item;
}

function adicionarTarefa() {
  const texto = campoTarefa.value.trim();

  if (texto === "") {
    campoTarefa.focus();
    return;
  }

  listaTarefas.prepend(criarTarefa(texto, false));
  atualizarContador();
  salvarTarefas();

  campoTarefa.value = "";
  campoTarefa.focus();
}

function carregarTarefas() {
  const salvas = JSON.parse(localStorage.getItem("tarefas")) || [];

  salvas.forEach(function (tarefa) {
    listaTarefas.appendChild(criarTarefa(tarefa.texto, tarefa.feita));
  });

  atualizarContador();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});

carregarTarefas();