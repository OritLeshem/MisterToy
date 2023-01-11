
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { Checkboxes } from "./checkboxes.jsx"


export function ToyFilter({ onSetFilter }) {

  const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

  const debounceFilter = useRef(utilService.debounce(onSetFilter, 500))

  const elInputRef = useRef(null)



  useEffect(() => {
    // update father cmp that filters change very type
    debounceFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    console.log(target.value)
    let { value, name: field, type, checked } = target
    value = (type === 'number') ? +value : value
    value = (type === 'checkbox') ? checked : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    // update father cmp that filters change on submit
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }


  return <section className="toy-filter full main-layout">
    <h2> Filter</h2>
    <form onSubmit={onSubmitFilter}>
      <label htmlFor="name">NAME:</label>
      <input type="text"
        id="name"
        name="name"
        placeholder="name"
        value={filterByToEdit.name}
        onChange={handleChange}
        ref={elInputRef}
      />

      <label htmlFor="price">PRICE:</label>
      <input type="number"
        id="price"
        name="price"
        placeholder="price"
        value={filterByToEdit.price}
        onChange={handleChange}
      />
      <label htmlFor="inStock">inStock:</label>
      <input name="inStock" type="checkbox" onChange={handleChange} />

      <select name="toys-labels" id="toys-labels" multiple onChange={handleChange}>
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
      </select>

      <button>Filter</button>
      <Checkboxes />


    </form>

  </section>
}