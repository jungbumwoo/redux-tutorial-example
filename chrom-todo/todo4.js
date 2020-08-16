const formToDo = document.querySelector(".todo-form"),
    inputToDo = document.querySelector(".todo-input"),
    ulList = document.querySelector(".todo-ul"),
    ulDoneList = document.querySelector(".done-ul");

let TODO_LIST = [];

function saveToDo(){
    localStorage.setItem("toDoList", JSON.stringify(TODO_LIST));
};

function handleInput(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const createBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId = TODO_LIST.length + 1;

    span.innerText = text;
    createBtn.innerText = "✅️";
    createBtn.onclick = checkToDo;
    createBtn.id = "check";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delBtnClicked);

    li.appendChild(span);
    li.appendChild(createBtn);
    li.appendChild(delBtn);
    li.id = newId;
    ulList.appendChild(li);
    
    // id값 주기 
    let toDoPart = {
        id: TODO_LIST.length +1,
        text: text
    }
    TODO_LIST.push(toDoPart);

    // save
    saveToDo();    

    /* 이건 왜 안되고 위에 두줄은 되는거냐
    let new_TODO_LIST = JSON.stringify(TODO_LIST.push(toDoPart));
    console.log(`new_TODO_LIST is ${new_TODO_LIST}`);

    localStorage.setItem("toDoList", new_TODO_LIST);
     */
    /* 이렇게 고쳐보면 되려나 - 이거도 안됨 ㅎㅎ
    let new_TODO_LIST = TODO_LIST.push(toDoPart);

    localStorage.setItem("toDoList", JSON.stringify(new_TODO_LIST));
    */
}

function checkToDo(event) {
    let checkBtn = event.target;
    checkBtn.innerText = "🔃";
    let checkLi = checkBtn.parentNode;
    
    ulDoneList.appendChild(checkLi);
};

function delBtnClicked(event) {
    let byeBtn = event.target;
    let byeLi = byeBtn.parentNode;

    ulList.removeChild(byeLi);
    
    let cleanTodo = TODO_LIST.filter((baba) => {
        return baba.id !== parseInt(byeLi.id);
    });
    TODO_LIST = cleanTodo;
    saveToDo();
};

function loadToDo(){
    let loadedToDo = localStorage.getItem("toDoList");
    if (loadedToDo !== null) {
        let parsedLoadedToDo = JSON.parse(loadedToDo);
        console.log(parsedLoadedToDo);
        parsedLoadedToDo.forEach((element) => {
            let savedText = element.text;
            handleInput(savedText);
        })
    }
}

function handleSubmit(){
    event.preventDefault();
    let inputValue = inputToDo.value;
    handleInput(inputValue);
    inputToDo.value = "";
}

function init() {
    loadToDo();
    formToDo.addEventListener("submit", handleSubmit);
}

init();