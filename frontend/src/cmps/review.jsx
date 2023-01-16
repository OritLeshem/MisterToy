import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'

import { loadReviews, addReview, removeReview } from '../store/actions/review.actions'
import { loadUsers } from '../../src/store/actions/user.action'

export function Review({ toyId }) {
  console.log(toyId)

  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  console.log(reviews)
  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId })

  useEffect(() => {
    loadReviews()

  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt) return alert('All fields are required')
    try {
      console.log('REVIEWTOEDIT', reviewToEdit)

      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      // setReviewToEdit({ txt: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  // function canRemove(review) {
  //   return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  // }


  return (
    <div className="review-app">
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {/* {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>} */}

            <h3>{review.txt}</h3>
            <h3>{review.userId}</h3>

            {/* By:
            <Link to={`/user/${review.userId}`}>
              {review.byUser.fullname}
            </Link> */}

          </li>
        ))}
      </ul>}

      <form onSubmit={onAddReview}>

        <textarea
          name="txt"
          onChange={handleChange}
          value={reviewToEdit.txt}
        ></textarea>
        <button>Add Review</button>
      </form>
      <hr />
    </div >
  )
}