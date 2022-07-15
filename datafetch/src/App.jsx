import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'

function App() {

  const [characters, setCharacters] = useState([]);

  const [name, setName] = useState('')

  const handleChange = e => {
    setName(e.target.value)
  }

  useEffect(() => {
    // fetch the data from the api
    axios.get('https://swapi.py4e.com/api/people')
      .then(response => {
        console.log(response.data.results)
        // set the state of characters
        setCharacters(response.data.results)
      })
      .catch(err => console.log(err))
    // this second parameter is the so called 'dependency array'
    // if it's empty useEffect is only executed when the component is mounted
    // if it holds a value it is executed when that value changes
    // if you don't add it useEffect is called on every rerender
    // and bc we update the state in useEffect here this would result in an infinite 
    // loop
  }, [])

  return (
    <div className="App">
      {name ? <strong>Hello {name}</strong> : 'Pls type your name 🦄 🌈'}
      <input type="text" onChange={handleChange} value={name} />
      {characters.map((character, i) => (
        <h1 key={i}>{character.name}</h1>
      ))}
    </div>
  )
}

export default App
