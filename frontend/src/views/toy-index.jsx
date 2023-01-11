// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { SET_FILTER, SET_SORT } from '../store/reducers/toy.reducer'
// import { ADD_TO_TOYT } from '../store/toy.reducer.js'
import { useEffect } from 'react'
import Example from '../cmps/test.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'
// import { PopupMenu } from '../cmps/popup-menu.jsx'

export function ToyIndex() {

  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  console.log(toys)
  // const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  // const shoppingToyt = useSelector((storeState) => storeState.toyModule.shoppingToyt)
  // const [toys, setToys] = useState([])
  // const [toyt, setToyt] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    onLoadToys(filterBy, sortBy)
  }, [filterBy, sortBy])


  function onLoadToys(filterBy, sortBy) {
    loadToys(filterBy, sortBy)
      .catch(err => {
        showErrorMsg('Cannot load toys')
      })
  }
  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER, filterBy })

  }
  function onSetSort(sortBy) {
    dispatch({ type: SET_SORT, sortBy })
  }


  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy')
      })
  }





  // function setFilter(filterBy) {
  //   console.log('setFilter', filterBy)
  //   onLoadToys(filterBy)

  // }

  return <section>
    {/* <Example /> */}

    <Link to={`/toy/edit`}>Add Toy</Link>
    <h3>Toys App</h3>
    <main>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      <ToySort onSetSort={onSetSort} />
      <ToyFilter onSetFilter={onSetFilter} />
      {/* {isLoading && <p>Loading...</p>} */}

      <hr />
    </main>
  </section>


}


