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

function printToDo(text){
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
};

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
        text: done_text
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
    /* done 쪽으로 보내준 다음 toDo에서 지워야하는건데 이건 이렇게는 안되징 
    delBtnClicked();
    */
    ulList.removeChild(checkLi);
    
    let goToDoneTodo = TODO_LIST.filter((baba) => {
        return baba.id !== parseInt(checkLi.id);
    });
    TODO_LIST = goToDoneTodo;
    saveToDo();
};

function returnClicked(event){
    let returnBtn = event.target;
    let returnedLi = returnBtn.parentNode;
    let gobackText = returnedLi.firstChild.innerText;
    printToDo(gobackText);

    ulDoneList.removeChild(returnedLi);
    
    let returnTodo = DONE_LIST.filter((baba) => {
        return baba.id !== parseInt(returnedLi.id);
    });
    DONE_LIST = returnTodo;
    saveDone();
}

function delBtnClicked(event) {
    let byeBtn = event.target;
    let byeLi = byeBtn.parentNode;
    console.log(byeLi);

    ulList.removeChild(byeLi);
    
    let cleanTodo = DONE_LIST.filter((baba) => {
        return baba.id !== parseInt(byeLi.id);
    });
    TODO_LIST = cleanTodo;
    saveToDo();
};

function returnDelBtnClicked(event) {
    let byeBtn = event.target;
    let byeLi = byeBtn.parentNode;

    ulDoneList.removeChild(byeLi);
    
    let cleanTodo = TODO_LIST.filter((baba) => {
        return baba.id !== parseInt(byeLi.id);
    });
    DONE_LIST = cleanTodo;
    saveDone();
};

function loadToDo(){
    let loadedToDo = localStorage.getItem("toDoList");
    if (loadedToDo !== null) {
        let parsedLoadedToDo = JSON.parse(loadedToDo);
        parsedLoadedToDo.forEach((element) => {
            let savedText = element.text;
            printToDo(savedText);
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
    printToDo(inputValue);
    inputToDo.value = "";
}

function init() {
    loadToDo();
    doneToDo();
    formToDo.addEventListener("submit", handleSubmit);
}

init();