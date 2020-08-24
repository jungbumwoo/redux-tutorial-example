/*
    오늘 해볼 것 :
    해야할 일 목록을 redux로 구현해보기.
*/
const todoForm = document.querySelector(".todoForm"),
    todoInput = document.querySelector(".todoInput"),
    todoList = document.querySelector(".todoList"),
    doneList = document.querySelector(".doneList")

let TODO_LIST = [];
let DONE_LIST = [];

function checkBtnClicked(event){
    let whichBtn = event.target;
    let whichLi = whichBtn.parentNode;
    console.log(whichLi);
    let spanText = whichLi.firstChild.innerText;
    
    todoList.removeChild(whichLi);
    /* filter 그냥 쓰면 id 안꼬이려나 */

    /* 이렇게 한 번 했다가 망함
    let filterToDo = TODO_LIST.filter(element =>
            element.id !== parseInt(whichLi.id)
        );
    */
   let filterToDo = TODO_LIST.filter((element) =>{
        return element.id !== parseInt(whichLi.id)
   });
    TODO_LIST = filterToDo;
    printDone(spanText);
    saveToDo();
}

function delBtnClicked(event) {
    let aaa = event.target;
    let delLi = aaa.parentNode;
    console.log(delLi);

    let FILTER_DONE = TODO_LIST.filter((element) => {
        return element.id !== parseInt(delLi.id);
    });

    TODO_LIST = FILTER_DONE;
    todoList.removeChild(delLi);
    saveToDo();
};

function doneDelBtnClicked(event){
    let aaa = event.target;
    let delLi = aaa.parentNode;
    console.log(delLi);

    let FILTER_DONE = DONE_LIST.filter((element) => {
        return element.id !== parseInt(delLi.id);
    });

    DONE_LIST = FILTER_DONE;
    doneList.removeChild(delLi);
    saveDone();
};

function printToDo(text){
    const li = document.createElement("li");
    const btn = document.createElement("btn");
    const span = document.createElement("span");
    const delBtn = document.createElement("btn");
    
    span.innerText = text;
    btn.innerText ="✅";
    btn.onclick= checkBtnClicked;
    delBtn.innerText = "❌";
    delBtn.onclick = delBtnClicked;


    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(delBtn);
    li.id = TODO_LIST.length + 1;

    todoList.appendChild(li);

    let TODO = {
        id: TODO_LIST.length +1,
        text
    };
    TODO_LIST.push(TODO);


    saveToDo(li);
    /*  
        Q. 얘 save하는 애가 print하는 함수 안에 있으면
        나중에 load 할때 이미 local에 save된 아이가
        다시 print되면서 다시 save되어버리면
        주렁주렁 다시 저장되어버리는 그런 문제 있는거아닌ㄴ가?
    */

};

function returnBtnClicked(event){
    let aaa = event.target;
    let returnLi = aaa.parentNode;
    console.log(returnLi);
    let returnText = returnLi.firstChild.innerText;

    let FILTER_DONE = DONE_LIST.filter((element) => {
        return element.id !== parseInt(returnLi.id);
    });

    DONE_LIST = FILTER_DONE;
    printToDo(returnText);
    doneList.removeChild(returnLi);
    saveDone();
};

function printDone(text){
    const li = document.createElement("li");
    const btn = document.createElement("btn");
    const span = document.createElement("span");
    const delBtn = document.createElement("btn");
    
    span.innerText = text;
    btn.innerText ="🔁";
    btn.onclick= returnBtnClicked;
    delBtn.innerText = "❌";
    /**/delBtn.onclick = doneDelBtnClicked;


    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(delBtn);
    li.id = DONE_LIST.length + 1;

    doneList.appendChild(li);

    let DONE = {
        id: DONE_LIST.length +1,
        text
    };
    DONE_LIST.push(DONE);

    saveDone();
    /*  
        Q. 얘 save하는 애가 print하는 함수 안에 있으면
        나중에 load 할때 이미 local에 save된 아이가
        다시 print되면서 다시 save되어버리면
        주렁주렁 다시 저장되어버리는 그런 문제 있는거아닌ㄴ가?
    */

};


function saveToDo(){
    localStorage.setItem("TODO_LIST", JSON.stringify(TODO_LIST));
}

function saveDone(){
    localStorage.setItem("DONE_LIST", JSON.stringify(DONE_LIST));
}

function handleSubmit(event){
    event.preventDefault();
    let abc = todoInput.value;
    printToDo(abc);
    todoInput.value = "";    
};

function loadtoDo(){
    let getToDoList = localStorage.getItem("TODO_LIST");
    let parsedToDoList = JSON.parse(getToDoList)
    parsedToDoList.forEach(element => 
        printToDo(element.text));
};

function loadtoDone(){
    let getToDoneList = localStorage.getItem("DONE_LIST");
    let parsedToDoneList = JSON.parse(getToDoneList);
    parsedToDoneList.forEach(element => 
        printDone(element.text));
};


function init(){
    loadtoDo();
    loadtoDone();
    todoForm.addEventListener("submit", handleSubmit);
};

init();




/* 두번째 child 가져오는 방법
    console.log(li.children[1]);
*/