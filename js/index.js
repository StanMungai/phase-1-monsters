document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('create-monster')
  
  const inputForm = document.createElement('form')
  const nameInput = createInput('text', 'name...', 'name')
  const ageInput = createInput('number', 'age...', 'age')
  const description = createInput('text', 'description...', 'description')
  const btn = document.createElement('button')
  btn.textContent = 'Create'

  inputForm.append(nameInput, ageInput, description, btn)
  formContainer.appendChild(inputForm)

  const container  = document.getElementById('monster-container')
  const monsterDiv = document.createElement('div')
  fetch('http://localhost:3000/monsters/?_limit=50')
   .then( res => res.json() )
   .then( monsters => {
    console.log(monsters)
    const header = document.createElement('h1')
    header.textContent = monsters.name

    const age = document.createElement('h4')
    age.textContent = monsters.age

    const bio = document.createElement('p')
    bio.textContent = monsters.description

    monsterDiv.append(header, age, bio)
    container.appendChild(monsterDiv)
   })
})

function createInput(inputType, inPlaceholder, inputName) {
  const inputs = document.createElement('input')
  inputs.type = inputType
  inputs.placeholder = inPlaceholder
  inputs.name = inputName

  return inputs;
}

