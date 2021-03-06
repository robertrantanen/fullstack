import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


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
    return filteredNames.map(person => <p key={person.name}>{person.name} {person.number}
    <button onClick={() => props.deletePerson(person.id)}>delete</button></p>)  
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm("Delete " + person.name +" ?")) { 
      personService.deletePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      setMessage("Deleted " + person.name)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateNumber = (person) => {
    const id = person.id
    const changedPerson = { ...person, number: newNumber }
    personService
      .update(id, changedPerson)
        .then(returnedPerson => {
          setMessage("Changed the number of " + newName)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
        .catch(error => {
          setErrorMessage(
            "Information of " + newName + " has already been removed from server"
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    setNewName('') 
    setNewNumber('')
  }


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personNames = persons.map(person => person.name)

    if (personNames.includes(newName)) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(person.name + " is already added to phonebook, replace the old number with a new one?")) { 
        updateNumber(person)
      }
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      setNewName('') 
      setNewNumber('')
      setMessage("Added " + newName)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      })
      .catch(error => {
        setErrorMessage("too short name or number")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={(event) => handleFilterChange(event)} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(event) => handleNameChange(event)} 
      handleNumberChange={(event) => handleNumberChange(event)} addName={(event) => addName(event)}/>
      <h2>Numbers</h2>
      <ListPersons persons = {persons} newFilter={newFilter} deletePerson={(id) => deletePerson(id)} />
    </div>
  )

}

export default App
