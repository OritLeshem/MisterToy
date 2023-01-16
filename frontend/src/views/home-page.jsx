import ImageSlider from "../cmps/image-slider"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { useEffect } from 'react'
import { ToyPreview } from "../cmps/toy-preview"


export function HomePage() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)

  console.log(toys)
  const dispatch = useDispatch()

  useEffect(() => {
    onLoadToys(filterBy, sortBy)
  }, [filterBy, sortBy])


  async function onLoadToys(filterBy, sortBy) {

    try {
      await loadToys(filterBy, sortBy)
    }
    catch {
      showErrorMsg('Cannot load toys')
    }

    loadToys(filterBy, sortBy)
      .catch(err => {
        showErrorMsg('Cannot load toys')
      })
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
  const slides = [
    { url: '/img/1.jpg', title: '1' },
    { url: '/img/2.jpg', title: '2' },
    { url: '/img/3.jpg', title: '3' },
    { url: '/img/4.jpg', title: '4' },
    { url: '/img/8.jpg', title: '8' }
  ]
  const containerStyles = {
    marginTop: '15px',
    width: '100%',
    height: '380px',
    margin: '0 auto',
  }
  return <div className="homepage">
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
    <h2>Our best sellers</h2>
    <ul className="toy-list">
      {/* <ToyPreview toy={toys[0]} onRemoveToy={onRemoveToy} />
      <ToyPreview toy={toys[1]} onRemoveToy={onRemoveToy} />
      <ToyPreview toy={toys[2]} onRemoveToy={onRemoveToy} />
      <ToyPreview toy={toys[3]} onRemoveToy={onRemoveToy} /> */}
    </ul>

  </div>


  {/* {for (let=0; i<3;i++ ){

           <ToyPreview toy={toys[0]} onRemoveToy={onRemoveToy} />
        }}
        */}

}






