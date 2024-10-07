import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState(null)
  const [dogImages, setDogImages] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const setDogBreed = (e) => {
    if (e.target.value !== 'default') {
    getBreedImages(e.target.value)
    } else {
      setDogImages(null)
      setShowAll(false)
    }
  }

  const getBreedImages = (breed) => {
    axios.get(`https://dog.ceo/api/breed/${breed}/images`).then((response) => {setDogImages(response.data.message)})
  }

  const clearSelection = () => {
    setDogImages(null)
    setShowAll(false)
    const dropdown = document.getElementById('dropdown')
    dropdown.value = "default"
  }

  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/list/all").then((response) => {setBreeds(response.data.message)})
  }, [])

  return (
    <div>
      <h1 id='header'>Dog Breed Images</h1>
      <select onChange={setDogBreed} id='dropdown'>
        <option value="default">Choose a breed!</option>
        {breeds ? Object.keys(breeds).map((breed, i) => {
          return <option key={breed} value={breed}>{breed}</option>
        }) : null}
      </select>
      <div id='imageGallery'>
        {dogImages && showAll? dogImages.map((image, i) => {
          return <img className='dogImage' src={image} alt={image} key={image}></img> 
          }) : null}
        {dogImages && showAll === false ? dogImages.slice(0,10).map((image, i) => {
          return <img className='dogImage' src={image} alt={image} key={image}></img> 
          }) : null}
      </div>
      <div>
        {dogImages ? <button className='button' onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less Images" : "Show All Images"}</button> : null}
        {dogImages ? <button className='button' onClick={() => clearSelection()}>Clear Selection</button> : null}
      </div>
    </div>
  );
}

export default App;
