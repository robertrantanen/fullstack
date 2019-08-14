import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const listCountries = () => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    if (filteredCountries.length === 1) {
      const index = countries.indexOf(filteredCountries[0])
      const country = countries[index]
      return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt="flag" height="150" width="150"/>
        </div>
      )
    }
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      return filteredCountries.map(country => <p key={country.name}>{country.name} </p>)  
    }
  }


  return (
    <div>
    find countries <input 
    value={newFilter} 
    onChange={handleFilterChange}
    />
    {listCountries()}
    </div>
  )
}

export default App;
