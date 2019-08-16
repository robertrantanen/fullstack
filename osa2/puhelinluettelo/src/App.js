import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
    <div>
    filter shown with <input 
    value={props.newFilter} 
    onChange={props.handleFilterChange}
    />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addName}>
    <div>
      name: <input 
      value={props.newName} 
      onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: <input 
      value={props.newNumber} 
      onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form> 
  )
}

const ListPersons = (props) => {
    const filteredNames = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    return filteredNames.map(person => <p key={person.name}>{person.name} {person.number}</p>)  
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personNames = persons.map(person => person.name)

    if (personNames.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      setNewName('') 
      setNewNumber('')
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={(event) => handleFilterChange(event)} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(event) => handleNameChange(event)} 
      handleNumberChange={(event) => handleNumberChange(event)} addName={(event) => addName(event)}/>
      <h2>Numbers</h2>
      <ListPersons persons = {persons} newFilter={newFilter} />
    </div>
  )

}

export default App
