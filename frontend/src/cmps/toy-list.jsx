import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy, addToToyt }) {
  return <ul className="toy-list">
    {toys.map(toy =>
      <li key={toy._id}>
        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
      </li>)}
  </ul>
}



