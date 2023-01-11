import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './reducers/toy.reducer'

// const { createStore, combineReducers } = Redux
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
  toyModule: toyReducer,
  // userModule: userReducer
})

export const store = createStore(rootReducer)

// For debug 
store.subscribe(() => {
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})

