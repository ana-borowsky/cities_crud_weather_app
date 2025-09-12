import { useEffect, useState } from "react";
import "./DataList.css"

function DataList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch('http://localhost:8800/cities')
      .then(response => response.json())
      .then(data => setData(data))
  }

  return (
    <div className="container">
      {data.map((city) => (
        <div className="item" key={city.id}>
          <strong>Nome:</strong> {city.name}<br></br>
          <strong>País:</strong>  {city.country}<br></br>
          <strong>Latitude:</strong>  {city.coord_lat}<br></br>
          <strong>Longitude:</strong>  {city.coord_lon}<br></br>
          <button onClick={() => { props.clicked(city) }} className="btn">Ver mais</button>
        </div>
      ))}
    </div>
  )
}
export default DataList;
