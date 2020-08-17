function reducer(state, action){
    if (state === undefined) {
        return { color: 'yellow' }
    }
    if ( action.type === 'CHANGE_COLOR'){
        return { color: action.color}
    }
}

let store = Redux.createStore(reducer);

/*
이거 왜 대체 오류나냐 시발?
function red() {
    var abc = store.getState();
    document.querySelector('#red').innerHTML = `
        <div class="container" style="background-color: ${abc.color}">
            <h3>red</h3>
            <input type=button value='fire' onclick="
                store.dispatch({type:'CHANGE_COLOR, color: 'red'})
            " />
        <div>
    `;
}
*/
function red() {
    var abc = store.getState();
    document.querySelector('#red').innerHTML = `
        <div class="container" style="background-color: ${abc.color}">
            <h3>red</h3>
            <input type=button value='fire' onclick="
                store.dispatch({type:'CHANGE_COLOR', color: 'red'})
            " />
        </div>
    `;
}
store.subscribe(red);
red();

function skyblue(){
    let abc = store.getState();
    document.querySelector('#skyblue').innerHTML = `
        <div class="container" style="background-color: ${abc.color}">
            <h3>skyblue</h3>
            <input type=button value='fire' onclick="
                store.dispatch({ type: 'CHANGE_COLOR', color: 'skyblue'})
            " />
        </div>
    `;
}
store.subscribe(skyblue);
skyblue();

function green() {
    let abc = store.getState();
    document.querySelector('#green').innerHTML = `
        <div class="container" style="background-color: ${abc.color}">
            <h3>green</h3>
            <input type=button value='fire' onclick=" 
                store.dispatch({ type: 'CHANGE_COLOR', color: 'green'})
            "/>
        </div>
    `;
};

store.subscribe(green);
green();