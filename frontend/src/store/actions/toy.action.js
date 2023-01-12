import { toyService } from '../../services/toy.service'
import { store } from '../store'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY, SET_IS_LOADING } from '../reducers/toy.reducer'

export async function loadToys(filterBy, sortBy) {
  console.log('action toy', filterBy, sortBy)

  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const toys = await toyService.query(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
    return toys
  }
  catch (err) {
    console.log('Had issues loading toys', err)
    throw err
  }
  finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

// Example for Optimistic mutation:
// export function removeToy(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     return toyService.remove(toyId)
//         .catch(err => {
//             store.dispatch({ type: UNDO_REMOVE_TOY })
//             console.log('Had issues Removing toy', err)
//             throw err
//         })
// }

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  }
  catch (err) {
    console.log('Had issues Removing toy', err)
    throw err

  }
}
export async function saveToy(toy) {
  const type = (toy._id) ? UPDATE_TOY : ADD_TOY
  try {
    const savedToy = await toyService.save(toy)
    store.dispatch({ type, toy: savedToy })
    return savedToy
  }
  catch (err) {
    console.error('Cannot save toy:', err)
    throw err
  }
}