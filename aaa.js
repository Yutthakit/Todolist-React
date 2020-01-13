import { returnStatement } from "@babel/types"
import { read } from "fs"

// function createStore(reducers, initialState){
//     let state = initialState
//     return {
//         getState: () => state,
//         dispatch: action => {
//             state = reducers(state, action)
//         },
//         subscribe: () => {},
//         unsubscribe: () => {}
//     }
// }


// function counterReducer(state, action) {
//     switch (action.type) {
//         case 'INCREMENT': return state + 1
//         case 'DECREMENT': return state - 1
//         default: return state
//     }
// }

function mathReducer(state, action) {
    switch (action.type) {
        case 'db' : return state ** action.pow
        case 'sin' : return Math.sin(state)
        case 'cos' : return Math.cos(state)
        default : return state
    }
}

// let store = createStore(counterReducer, 0)
// console.log(store.getState())
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
// console.log(store.getState())
// store.dispatch({type: 'DECREMENT'})
// console.log(store.getState())

// store = createStore(mathReducer, 2)
// console.log(store.getState())
// store.dispatch({ type:'db', pow:2})
// console.log(store.getState())
// store.dispatch({ type: 'sin'})
// console.log(store.getState())
// store.dispatch({ type: 'cos'})
// console.log(store.getState())


function createStore(reduce, initialState) {
    let state = initialState
    let subscribers = []
    return {
        getState : () => state,
        dispatch : action => {
            state = reduce(state, action)
            subscribers.forEach(callback => {
                if(callback) {
                    callback()
                }
            })
        },
        subscribe : callback => {
            subscribers.push(callback)
            return subscribers.length - 1
        },
        unsubscribe : id => {
            subscribers[id] = null
        }
    }
}

function rootReduce(state,action) {
    switch (action.type){
        case 'root' : return Math.sqrt(state)
        default : return state
    }
}


let store = createStore(mathReducer, 0)
// console.log(store.getState())
// store.dispatch({type: 'root'})
// console.log(store.getState())

store.subscribe(() => {
    console.log('wow', + store.getState())
})

store.subscribe(() => {
    alert('such amazing!')
})

store.dispatch({
    type : 'db', pow: 3
})