const toDoForm = document.querySelector(".todo-form"),
    toDoInput = document.querySelector(".todo-input"),
    toDoUl = document.querySelector(".todo-ul");

function dealList(text){
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    btn.innerText = "❌";
    delBtn.innerText = "✅️";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(btn);

    toDoUl.appendChild(li);
};

function dealForm(event){
    event.preventDefault();
    let toDoValue = toDoInput.value;
    dealList(toDoValue);
    toDoInput.value = "";
};

function init(){
    toDoForm.addEventListener("submit", dealForm);
    // 삭제 이벤트 리스너
    // 버튼.addEventListener("click", dealRemove);
};

init();