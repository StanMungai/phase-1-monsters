document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('create-monster')
  
  const inputForm = document.createElement('form')
  const nameInput = createInput('text', 'name...', 'monsterName')
  const ageInput = createInput('number', 'age...', 'monsterAge')
  const description = createInput('text', 'description...', 'desc')
  const btn = document.createElement('button')
  btn.textContent = 'Create'
  btn.addEventListener('click', (e) =>{
    e.preventDefault()

    const newMonster = {
        name: nameInput.value,
        age: ageInput.value,
        description: description.value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
        .then( res => res.json() )
        .then( monster => renderMonster(monster))
  })

  inputForm.append(nameInput, ageInput, description, btn)
  formContainer.appendChild(inputForm)

  fetch('http://localhost:3000/monsters/?_limit=50')
   .then( res => res.json() )
   .then( monsters => {
    monsters.forEach(renderMonster)
   })

   const forwardbtn = document.getElementById('forward')
   const backbtn = document.getElementById('back')

   forwardbtn.addEventListener('click', handleFowardClick)
   backbtn.addEventListener('click', handleBackClick)
})

function createInput(inputType, inPlaceholder, inputName) {
  const inputs = document.createElement('input')
  inputs.type = inputType
  inputs.placeholder = inPlaceholder
  inputs.name = inputName

  return inputs;
}

// function createNewMonster(e) {
//     e.preventDefault()

//     const newMonster = {
//         name: e.target.mosterName.value,
//         age: e.target.monsterAge.value,
//         description: e.target.desc.value
//     }

//     fetch('http://localhost:3000/monsters', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify(newMonster)
//     })
//         .then( res => res.json() )
//         .then( monster => console.log(monster))
// }

function renderMonster(monster) {
    const container  = document.getElementById('monster-container')
    const monsterDiv = document.createElement('div')
    const header = document.createElement('h2')
    header.textContent = monster.name

    const age = document.createElement('h4')
    age.textContent = `Age: ${monster.age}`

    const bio = document.createElement('p')
    bio.textContent = `Bio: ${monster.description}`

    monsterDiv.append(header, age, bio)
    container.appendChild(monsterDiv)
}

function handleBackClick() {
    console.log('back click')
}

function handleFowardClick() {
    console.log('forward click')
}