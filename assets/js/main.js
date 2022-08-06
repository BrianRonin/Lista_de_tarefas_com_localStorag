const inputTarefa = document.querySelector("#input-tarefa");
const btnAddTarefa = document.querySelector("#btn-add-tarefa");
const divListaDeTarefas = document.querySelector("#div-lista-de-tarefas");

function loadSotoreTarefas() {
  const listaDeTarefas = localStorage.getItem("tarefas");
  const tarefas = JSON.parse(listaDeTarefas);

  if (!listaDeTarefas) return;
  for (let tarefa of tarefas) {
    console.log(tarefa);
    criaTarefa(tarefa);
  }
}
loadSotoreTarefas();

function storeTarefa() {
  let listarTarefas = divListaDeTarefas.querySelectorAll("div");
  listaDeTarefas = [];

  for (let tarefa of listarTarefas) {
    let tarefaText = tarefa.innerText;
    tarefaText = tarefaText.replace("check", "");
    tarefaText = tarefaText.replace("\n\n", "");
    listaDeTarefas.push(tarefaText);
    console.log(listaDeTarefas);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function addDiv() {
  const div = document.createElement("div");
  return div;
}

function criaTarefa(tarefa) {
  const div = addDiv();
  div.innerHTML = `<p>${tarefa}</p>
  <button class="btn btn-dark mx-2 dell-tarefa">
  <i class="material-icons icon-dell-tarefa" style=" font-size: 30px;">
  check</i>
  </button>`;
  div.setAttribute("class", "tarefa");
  divListaDeTarefas.appendChild(div);
  storeTarefa();
}

/////////////////// Inputs //////////////////////////

function cleanInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

btnAddTarefa.addEventListener("click", function (e) {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
  cleanInput();
});

inputTarefa.addEventListener("keypress", function (key) {
  if (key.key == "Enter") {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    cleanInput();
  }
});

document.addEventListener("click", function (key) {
  const element = key.target;

  if (element.classList.contains("dell-tarefa")) {
    element.parentElement.remove();
    storeTarefa();
  } else if (element.classList.contains("icon-dell-tarefa")) {
    btn = element.parentElement;
    btn.parentElement.remove();
    storeTarefa();
  }
});
