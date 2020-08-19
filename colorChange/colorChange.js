let store = Redux.createStore(reducer);

function reducer(state, action){
    if (state === undefined){
        return { color: "yellow" }
    }
    if (action.type === 'COLOR_CHANGE'){
        return { color: action.color}
    }
};

function red(){
    let _getState = store.getState();
    console.log(_getState);
    document.querySelector("#red").innerHTML = `
        <div class=container style=background-color:${_getState.color}>
            <h3>red</h3>
            <input type=button onclick="redFunction()" value="Fire"                
            </input>
        </div>
    `;
};
function redFunction(){
    store.dispatch({
        type: 'COLOR_CHANGE',
        color: 'red'
    })
}
red();
store.subscribe(red);

/* Skyblue */
function skyblue(){
    let _getState = store.getState();
    console.log(_getState);
    document.querySelector("#skyblue").innerHTML = `
        <div class=container style=background-color:${_getState.color}>
            <h3>skyblue</h3>
            <input type=button onclick="skyblueFunction()" value="Fire"                
            </input>
        </div>
    `;
};
function skyblueFunction(){
    store.dispatch({
        type: 'COLOR_CHANGE',
        color: 'skyblue'
    })
}
skyblue();
store.subscribe(skyblue);

/* Green */
function green(){
    let _getState = store.getState();
    console.log(_getState);
    document.querySelector("#green").innerHTML = `
        <div class=container style=background-color:${_getState.color}>
            <h3>green</h3>
            <input type=button onclick="greenFunction()" value="Fire"                
            </input>
        </div>
    `;
};
function greenFunction(){
    store.dispatch({
        type: 'COLOR_CHANGE',
        color: 'green'
    })
}
green();
store.subscribe(green);

