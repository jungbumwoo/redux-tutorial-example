const side = document.querySelector(".side"),
    sideOl = side.querySelector("ol"),    
    title = document.querySelector(".title"),
    content = document.querySelector(".content"),
    inputClass = document.querySelector(".input"),
    formIn = document.querySelector("#formIn"),
    inputTitle = document.querySelector("#titleInput"),
    inputContent = document.querySelector("#contentInput");

const store = createStore(reducer);

function reducer(state, action){
    if (state === undefined) {
        return {}
    }
    
};

function handleSubmit(event){
    event.preventDefault();

    let title = inputTitle.value;
    let content = inputContent.value;

    const li = document.createElement("li");
    const span = document.createElement("span");

    span.innerText = title;

    li.appendChild(span);
    sideOl.appendChild(li);

    inputContent.value = "";
    inputTitle.value = "";

}

function loadList(){
    console.log("loadList");
};

function init(){
    loadList();
    formIn.addEventListener("submit", handleSubmit);
};

init();

