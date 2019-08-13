import React, { useState } from 'react'

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
