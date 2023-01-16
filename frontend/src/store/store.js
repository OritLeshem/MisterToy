import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './reducers/toy.reducer'
import { userReducer } from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'



// const { createStore, combineReducers } = Redux
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
  reviewModule: reviewReducer,

})

export const store = createStore(rootReducer)

// For debug 
store.subscribe(() => {
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})

