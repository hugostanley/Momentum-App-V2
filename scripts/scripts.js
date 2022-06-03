// Name input selector
const inputName = document.querySelector('.name-input')

// Clock and Greeting Selectors
const date = new Date()
let hours = date.getHours()
let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
let clock = document.querySelector('.clock')
let main = document.querySelector('body')
let greetText = document.querySelector('.greeting')

// Quotes Selectors
let quoteElem = document.querySelector('.quote-text')
const editBtn = document.querySelector('.edit')
let quotes = [
   '"Don\'t let yesterday take too much of today."',
   '"Happiness is not the absence of problems, it is the ability to deal with them."',
   '"There is nothing that works out for the worst that won\'t work out for the better."',
   '"The hardest shot you\'d ever take is the one that you didn\'t take."',
]

let randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
quoteElem.innerText = randomQuote

console.log(quotes.length)

let newQuote = localStorage.getItem('quote')
console.log(newQuote)
quotes.push(newQuote)
console.log(quotes)

// ToDo Selectors
const toDoBtn = document.querySelector('.todo--text')

// Event Listeners
inputName.addEventListener('keypress', createGreeting) // Greeting
editBtn.addEventListener('click', insertQuote) // Custom Quote Event listener

// Functions
function createGreeting(e) {
   if (e.key === 'Enter') {
      // get name
      let username = inputName.value
      // add fade out animation
      inputName.classList.add('input-fade-out')
      // new focus input
      const focusInput = document.createElement('input')
      focusInput.classList.add('focus-input')
      focusInput.setAttribute('placeholder', 'Whats your focus for the day?')

      // header elem
      const headerElem = document.querySelector('header')
      // username h2
      const nameElem = document.querySelector('.greeting-name')
      nameElem.classList.add('text-fade-in')
      nameElem.textContent = username

      inputName.addEventListener('animationend', () => {
         inputName.style.display = 'none'
         headerElem.insertBefore(focusInput, headerElem.children[1])
      })

      focusInput.addEventListener('keypress', e => {
         if (e.key === 'Enter') {
            focusInput.classList.add('input-fade-out')
            let focusActivity = focusInput.value
            // ufocustex display
            let focusText = document.querySelector('.focus__text')
            focusText.classList.add('text-fade-in')
            focusText.textContent = focusActivity
            // username diosplay
            let usernameDisplay = document.createElement('span')
            usernameDisplay.textContent = username

            headerElem.insertBefore(usernameDisplay, headerElem[1])
         }
      })
   }
}

function displayHeading() {
   if (hours === 12) {
      clock.innerText = `12:${minutes}`
   } else if (hours >= 12 && hours <= 18) {
      hours = hours % 12
      clock.innerText = `${hours}:${minutes}`
      greetText.textContent += 'Good Afternoon'
      main.style.backgroundImage = 'url(../images/forest.jfif)'
   } else if (hours >= 19 && hours < 24) {
      hours = hours % 12
      clock.innerText = `${hours}:${minutes}`
      greetText.textContent += 'Good Evening'
      main.style.backgroundImage = 'url(../images/darkmountain.jpg)'
   } else if (hours >= 1 && hours <= 11) {
      clock.innerText = `${hours}:${minutes}`
      greetText.textContent += 'Good Morning'
      main.style.backgroundImage = 'url(../images/sunrise.jpg)'
   }
}

displayHeading()

function insertQuote() {
   quoteElem.style.display = 'none'
   editBtn.style.display = 'none'
   let quoteInput = document.createElement('input')
   quoteInput.classList.add('quote-input')
   const quoteDiv = document.querySelector('.quotes')
   quoteInput.setAttribute('placeholder', 'Type New Quote Here')
   quoteDiv.insertBefore(quoteInput, quoteDiv.children[0])

   quoteInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
         let newQuote = quoteInput.value
         quoteElem.textContent = `\"${newQuote}\"`
         quoteInput.style.display = 'none'
         quoteElem.style.display = 'block'
         editBtn.style.display = 'initial'

         localStorage.setItem('quote', newQuote)
         storedInput = localStorage.getItem('quote')

         quotes.push(storedInput)
      }
   })
}

const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('.close-btn')

toDoBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
function openModal() {
   modal.showModal()
}

function closeModal() {
   modal.setAttribute('closing', '')
   modal.addEventListener(
      'animationend',
      () => {
         modal.removeAttribute('closing')
         modal.close()
      },
      { once: true }
   )
   //
}

let todoInput = document.querySelector('.todo-input')

todoInput.addEventListener('keypress', addTodo)
const listCon = document.querySelector('.list-container')
function addTodo(e) {
   if (e.key === 'Enter') {
      e.preventDefault()

      //tODO DIV
      const todoDiv = document.createElement('div')
      todoDiv.classList.add('todo')
      // new span
      const todoItem = document.createElement('span')
      todoItem.classList.add('todo-item')
      todoDiv.appendChild(todoItem)
      todoItem.innerText = todoInput.value
      // check
      const check = document.createElement('span')
      check.textContent = 'check'
      check.classList.add('material-symbols-outlined', 'check')
      todoDiv.appendChild(check)
      // delet
      const deleteBtn = document.createElement('span')
      deleteBtn.textContent = 'delete'
      deleteBtn.classList.add('material-symbols-outlined', 'delete')
      todoDiv.appendChild(deleteBtn)
      //
      listCon.appendChild(todoDiv)
      //clear todo input value
      todoInput.value = ''

      check.addEventListener('click', () => {
         todoItem.classList.add('removetodo')
      })

      deleteBtn.addEventListener('click', () => {
         todoDiv.classList.add('removetododiv')

         todoDiv.addEventListener('animationend', () => {
            todoDiv.remove()
         })
      })
   }
}
