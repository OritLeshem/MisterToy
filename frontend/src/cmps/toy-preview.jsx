import { NavLink } from "react-router-dom";
// import { detail } from "../assets/img/detail.png"

export function ToyPreview({ toy, onRemoveToy }) {
  return (

    <article className="toy-preview">

      <img src={toy.img} />
      <h4>{toy.name}</h4>
      <p><span>${toy.price}</span></p>
      <div className="btn-icon-container">
        <NavLink to={`/toy/${toy._id}`}><img className="btn-icon" src={require(`../assets/img/detail.png`)} alt="" /></NavLink>
        <NavLink to={`/toy/edit/${toy._id}`}><img className="btn-icon" src={require(`../assets/img/edit.png`)} alt="" /></NavLink>
        <button className="btn" onClick={() => { onRemoveToy(toy._id) }}><img className="btn-icon" src={require(`../assets/img/garbage1.png`)} alt="" /></button>
      </div>
    </article>
  )
}