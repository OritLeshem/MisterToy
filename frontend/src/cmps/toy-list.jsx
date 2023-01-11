import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy, addToToyt }) {
  return <ul className="toy-list">
    {toys.map(toy =>
      <li className="toy-preview" key={toy._id}>
        <ToyPreview toy={toy} />

        <div>
          <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
          <Link to={`/toy/edit/${toy._id}`} className="fa-regular pen-to-sgure"
            title="edit">edit</Link>
          <button >Change price</button>
        </div>


      </li>)}
  </ul>
}



