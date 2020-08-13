const toDoForm = document.querySelector(".todo-form"),
    toDoInput = document.querySelector(".todo-input"),
    toDoUl = document.querySelector(".todo-ul");

let TODOS_LS = "";
const toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function paintToDo(text){
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    btn.innerText = "❌";
    delBtn.innerText = "✅️";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(btn);
    li.id = newId;

    toDoUl.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
};

function dealForm(event){
    event.preventDefault();
    let toDoValue = toDoInput.value;
    paintToDo(toDoValue);
    toDoInput.value = "";
};

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        console.log(loadedToDos);
    }
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);
    })
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", dealForm);
    // 삭제 이벤트 리스너
    // 버튼.addEventListener("click", dealRemove);
};

init();