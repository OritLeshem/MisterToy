import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()
  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  async function loadToy() {


    try {
      const toy = await toyService.getById(toyId)
      setToyToEdit(toy)
    }
    catch (err) {
      console.log('Had issues in toy details', err)
      navigate('/toy')
    }
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  async function onSaveToy(ev) {
    ev.preventDefault()
    // saveToy(toyToEdit)

    try {
      const toy = await saveToy(toyToEdit)
      console.log('toy saved', toy);
      showSuccessMsg('Toy saved!')
      navigate('/toy')
    }
    catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save toy')
    }
  }

  return <section className="toy-edit">
    <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

    <form onSubmit={onSaveToy}>
      <label htmlFor="name">name : </label>
      <input type="text"
        name="name"
        id="name"
        placeholder="Enter name..."
        value={toyToEdit.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Price : </label>
      <input type="number"
        name="price"
        id="price"
        placeholder="Enter price"
        value={toyToEdit.price}
        onChange={handleChange}
      />

      <div>
        <button>{toyToEdit._id ? 'Save' : <AddIcon />}</button>
        <Link to="/toy">Cancel</Link>
      </div>
    </form>
  </section>
}