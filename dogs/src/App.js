import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState(null)
  const [selectedBreed, setSelectedBreed] = useState(null)
  const [dogImages, setDogImages] = useState(null)

  const getBreedImages = (breed) => {
    const url = `https://dog.ceo/api/breed/${breed}/images`
    axios.get(url).then((response) => {setDogImages(response.data.message)})
  }

  useEffect(() => {
    const url = "https://dog.ceo/api/breeds/list/all"
    axios.get(url).then((response) => {setBreeds(response.data.message)})
  }, [])

  return (
    <div>
      <select onChange={(e) => {
        setSelectedBreed(e.target.value)
        getBreedImages(selectedBreed)
      }}>
        {breeds ? Object.keys(breeds).map((breed, i) => {
          return <option key={breed} value={breed}>{breed}</option>
        }) : null}
      </select>
      
    </div>
  );
}

export default App;
