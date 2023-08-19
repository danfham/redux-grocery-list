// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    groceries: []
}

//establish the reducer (handles all changes to state variables)
const groceryReducer = (state = initialState.groceries,action) => {
    switch(action.type){
        case 'grocery/add':
            return[
                ...state,
                {
                    text : action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

//establish store
let store = Redux.createStore(groceryReducer)

//define actions
const clearList = () => {
    document.getElementById('newItem').value=''
    store.dispatch({
        type: 'grocery/clear'
    })
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type:'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}

//define event listeners
grocerySubmit.addEventListener('click', (e)=>{newGrocery(e)})
clearBtn.addEventListener('click',clearList)

//render information to screen
const renderList = (state) => {
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)