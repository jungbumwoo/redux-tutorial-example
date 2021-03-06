const formToDo = document.querySelector(".todo-form"),
    inputToDo = document.querySelector(".todo-input"),
    ulList = document.querySelector(".todo-ul"),
    ulDoneList = document.querySelector(".done-ul");

let TODO_LIST = [];
let DONE_LIST = [];

function saveToDo(){
    localStorage.setItem("toDoList", JSON.stringify(TODO_LIST));
};

function saveDone(){
    localStorage.setItem("doneList", JSON.stringify(DONE_LIST));
};

function handleInput(text){
    let li = document.createElement("li");
    let delBtn = document.createElement("button");
    let createBtn = document.createElement("button");
    let span = document.createElement("span");
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
    /*
    정답 : 
    TODO_LIST.push(toDoPart);
    localStorage.setItem("toDoList", JSON.stringify(TODO_LIST));
    */
}

function printDone(done_text) {
    console.log("print done");
    let done_li = document.createElement("li");
    let done_delBtn = document.createElement("button");
    let done_returnBtn = document.createElement("button");
    let done_span = document.createElement("span");
    let done_newId = DONE_LIST.length + 1;

    done_span.innerText = done_text;
    done_returnBtn.innerText = "🔃";
    done_returnBtn.onclick = returnClicked;
    done_returnBtn.id = "returned";
    done_delBtn.innerText = "❌";
    done_delBtn.addEventListener("click", returnDelBtnClicked);

    done_li.appendChild(done_span);
    done_li.appendChild(done_returnBtn);
    done_li.appendChild(done_delBtn);
    done_li.id = done_newId;
    ulDoneList.appendChild(done_li);
    
    // id값 주기 
    let donePart = {
        id: DONE_LIST.length +1,
        text: text
    }
    DONE_LIST.push(donePart);

    // save
    saveDone();    
}

function checkToDo(event) {
    let checkBtn = event.target;  /* 리턴버튼 */
    /* 리턴버튼 클릭 */
    let checkLi = checkBtn.parentNode;
    console.log(checkLi);
    let textExtract = checkLi.firstChild.innerText;
    console.log(textExtract);
    printDone(textExtract);
};

function returnClicked(event){
    let returnBtn = event.target;
    let returnedLi = returnBtn.parentNode;
    let gobackText = returnedLi.firstChild.innerText;

    console.log(gobackText);
}

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

function returnDelBtnClicked(event) {
    console.log("returnDelBtnClicked");
};

function loadToDo(){
    let loadedToDo = localStorage.getItem("toDoList");
    if (loadedToDo !== null) {
        let parsedLoadedToDo = JSON.parse(loadedToDo);
        parsedLoadedToDo.forEach((element) => {
            let savedText = element.text;
            handleInput(savedText);
        })
    }
}

function doneToDo(){
    let done_List = localStorage.getItem("doneList");
    if(done_List !== null) {
        let parsedDone = JSON.parse(done_List);
        parsedDone.forEach((element) => {
            let doneText = element.text;
            printDone(doneText);
        })
    }
};

function handleSubmit(){
    event.preventDefault();
    let inputValue = inputToDo.value;
    handleInput(inputValue);
    inputToDo.value = "";
}

function init() {
    loadToDo();
    doneToDo();
    formToDo.addEventListener("submit", handleSubmit);
}

init();