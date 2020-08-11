const formToDo = document.getElementById("toDoForm");
const inputToDo = document.getElementById("toDoInput");
const toDoList = document.querySelector(".js-toDoList");

function printToDo(submittedValue){
    // 리스트 찍어주깅
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const span = document.createElement("span");
    btn.innerText = "❌";
    span.innerText= submittedValue;
    
    li.appendChild(span);
    li.appendChild(btn);

    toDoList.appendChild(li);
};

function toDoSumbit(){
    event.preventDefault();
    const submittedValue = inputToDo.value;
    console.log(submittedValue);
    inputToDo.value = "";
    printToDo(submittedValue);
};

formToDo.addEventListener("submit", toDoSumbit);