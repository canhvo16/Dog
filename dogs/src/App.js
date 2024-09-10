import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState(null)

  useEffect(() => {
    const url = "https://dog.ceo/api/breeds/list/all"
    axios.get(url).then((response) => {setBreeds(response.data.message)})
    console.log(breeds)
  }, [])

  return (
    <div>
      <select>
        {breeds ? Object.keys(breeds).map((breed, i) => {
          return <option key={breed} value={breed}>{breed}</option>
        }) : null}
      </select>
    </div>
  );
}

export default App;
