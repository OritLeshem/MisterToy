import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Review } from '../cmps/review.jsx'
import { ChatApp } from './chat-app.jsx'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService.getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })
  }

  if (!toy) return <div>Loading...</div>
  return <section className="toy-details">
    <div className="toy-details-img"><img src={toy.img} /></div>
    <div className="toy-details-info">
      <ChatApp toyId={toyId} />
      <h2>Review about {toy.name}</h2>
      <Review toyId={toy._id} />
      <h1> {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>

      <div className="toy-details-btn">
        <Link to={`/toy`}><img className="btn-icon" src={require(`../assets/img/undo.png`)} alt="" /></Link>
        <Link to={`/toy/edit/${toy._id}`}><img className="btn-icon" src={require(`../assets/img/edit.png`)} alt="" /></Link>
      </div>

      <div>Reviews:


      </div>
    </div>
  </section>
}