import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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
      setPersons(persons.concat(personObject))
    }
      setNewName('') 
      setNewNumber('') 
  }

  const listPersons = () => {
    if (newFilter === '') {
      return persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    } else {
      const filteredNames = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      return filteredNames.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input 
          value={newFilter} 
          onChange={handleFilterChange}
          />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {listPersons()}
    </div>
  )

}

export default App
