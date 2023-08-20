import {indexInit} from "../index";
import {goFetchAuthOrReg, setPost} from "../core/utils";

export class Form {
  constructor(parentModal, url, html, title) {
    this.parentModal = parentModal
    this.html = html
    this.URL = url
    this.title = title

    this.form = document.createElement('form')
    this.form.classList.add('form-style')
    this.init()

    this.parentModal.setContentAndTitle({title: title, content: this.form})
  }

  init() {
    this.form.insertAdjacentHTML('afterbegin', this.html)

    this.pMail = this.form.querySelector('#p-text-mail')
    this.pMailExist = this.form.querySelector('#p-exist-mail')
    this.pPass = this.form.querySelector('#p-text-pass')


    this.form.addEventListener('submit', formHandler.bind(this))

  }
}

function formHandler(event) {
  event.preventDefault()

  const email = this.form.querySelector('#email')
  const password = this.form.querySelector('#password')

  email.addEventListener('input', () => {
    this.pMail.classList.add('hide')
    email.style.border = '1px solid black'
  })
  password.addEventListener('input', () => {
    this.pPass.classList.add('hide')
    password.style.border = '1px solid black'
  })

  goFetchAuthOrReg(this.URL, email.value, password.value)
    .then(response => {
      if (response && response.error) {

        if (response.error.message === 'EMAIL_EXISTS') {
          email.style.border = '2px solid red'
          this.pMailExist.classList.remove('hide')

        } else if (response.error.message === 'EMAIL_NOT_FOUND' ||
          response.error.message === 'INVALID_EMAIL') {
          email.style.border = '2px solid red'
          this.pMail.classList.remove('hide')

        } else if (response.error.message === 'INVALID_PASSWORD' || 'WEAK_PASSWORD : Password should be at least 6 characters') {
          password.style.border = '2px solid red'
          this.pPass.classList.remove('hide')
        }
        throw new Error(response.error.message + ', code: ' + response.error.code)
      }
      return response.idToken
    })


    .then(idToken => {
      console.log('fetch OK')
      //-----------LOCALSTORAGE-----------------
      localStorage.setItem('token', idToken)
      indexInit()
      email.value = ''
      password.value = ''
      this.parentModal.close()
      this.parentModal.removeContent()

      setTimeout(() => {
        if (this.title === 'зарегистрироваться') {
          alert('Вы зарегистрировались')
        } else if (this.title === 'войти') {
          alert('Вы вошли')
        }
      }, 0)

    })
    .catch(error => {
      console.error('ERROR auth', error)
    })
}


export function startHandlerForm() {
  const recordForm = document.getElementById('record-form')
  recordForm.addEventListener("submit", recordHandler)

  const recordAddBtn = recordForm.querySelector('#record-add-btn')
  const formInput = recordForm.querySelector('#record-input')

  const recordClearBtn = recordForm.querySelector('#record-clear-btn')
  recordClearBtn.addEventListener('click', ()=>{
    formInput.value = ''
  })

  async function recordHandler(event) {
    event.preventDefault()
    recordAddBtn.disabled = true

    const response = await setPost({name: formInput.value})
    formInput.value = ''
    showHide()
    recordAddBtn.disabled = false

    response.json().then(res => console.log(res))
  }
}

function showHide() {
  const answer = document.getElementById('record-answer')
  answer.classList.remove('hide')
  setTimeout(() => {
    answer.classList.add('hide')
  }, 2000)
}