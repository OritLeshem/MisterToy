import { GoogleMap } from "./google-map";

export function AboutUs() {
  return (

    <section>
      <h2>Our vision:</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>


      <div className="stores-container">

        <div className="info-stores">
          <h2>Our stores:</h2>
          <h3>London</h3><p> 519-999-3333</p><p>london@beetoy.com</p>
          <h3>Toronto</h3><p> 519-999-3333</p><p>toronto@beetoy.com</p>
          <h3>Hamilton</h3> <p>519-999-3333</p><p>hamilton@beetoy.com</p>
        </div>
        <div className="map-container">
          <GoogleMap />
        </div>
      </div>
    </section>



  )

}
