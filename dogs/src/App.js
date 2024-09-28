import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState(null)
  const [dogImages, setDogImages] = useState(null)

  const onChange = (e) => {
    if (e.target.value !== 'default') {
    getBreedImages(e.target.value)
    } else {
      setDogImages(null)
    }
  }

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
      <select onChange={onChange}>
        <option value="default">Choose a breed!</option>
        {breeds ? Object.keys(breeds).map((breed, i) => {
          return <option key={breed} value={breed}>{breed}</option>
        }) : null}
      </select>
      <div>
        {dogImages ? dogImages.map((image, i) => {
          return <img src={image} alt={image} key={image}></img> 
        }) : null}
      </div>
    </div>
  );
}

export default App;
