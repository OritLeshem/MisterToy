import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"

export function ToySort({ onSetSort }) {
  const [sortBy, setSortBy] = useState(toyService.getDefaultSort())

  useEffect(() => {
    onSetSort(sortBy)
  }, [sortBy])

  function handleChange({ target }) {
    console.log(target)
    let { value } = target
    let { checked } = target
    setSortBy((prevSort) => {
      // if (type === 'checkbox' && checked) { }
      // (type === 'checkbox') checked: value
      // prevSort['category']=value
      // prevSort.category = value
      // prevSort[value] = prevSort[value] === null ? 1 : null
      // return { ...prevSort, [value]: prevSort[value] }
      if (target.name === "asc") return { ...prevSort, asc: checked }
      if (target.name === "sort-by") return { ...prevSort, category: value }
      return { ...prevSort, category: value }


    })
  }


  return <div>
    <section className="toy-sort">
      <select name="sort-by" onChange={handleChange}>
        <option value="">Sort by</option>
        <option value="name">name</option>
        <option value="createdAt">date</option>
        <option value="price">price</option>
      </select>
    </section>
    {/* <button onClick={handleDirectionChange}>Change direction {sortBy.asc ? '^' : 'v'}</button> */}
    <label htmlFor="inStock">asc:</label>
    <input name="asc" type="checkbox" onChange={handleChange} />
  </div>
}
