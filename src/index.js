import './main.scss';
import './style.css';

import {Theme} from "./core/theme";
import {startHandlerForm} from "./forms/form.js"
import {getNotes} from "./core/utils";
import {Modal} from './core/modal'
import {AuthForm} from "./forms/auth.form";
import {RegForm} from "./forms/reg.form";


const btnLogin = document.getElementById('login-btn')
const regBtn = document.getElementById('reg-btn')
const elTextAuth = document.getElementById('login-text')

const btnShowNotes = document.querySelector('.show-notes')
const authTextDiv = document.getElementById('auth-text')

const authUlBlock = document.querySelector('.show-li')


new Theme()
const compModal = new Modal()
startHandlerForm()

window.addEventListener('DOMContentLoaded', indexInit)
window.addEventListener('click', windowHandler)


export function indexInit() {
  const token = localStorage.getItem('token')

  if (token) {
    elTextAuth.classList.remove('hide')
    btnLogin.textContent = 'Выйти'

    btnLogin.classList.remove('login')
    btnLogin.classList.add('exit')

    authTextDiv.classList.add('hide')
    btnShowNotes.disabled = false

    regBtn.classList.add('hide')
  }
}

async function windowHandler(event) {
  if (event.target.classList.contains('login')) {
    new AuthForm(compModal)
    compModal.open()

  } else if (event.target.id === 'reg-btn') {
    new RegForm(compModal)
    compModal.open()

  } else if (event.target.classList.contains('exit')) {
    localStorage.removeItem('token')
    elTextAuth.classList.add('hide')
    btnLogin.textContent = 'Войти'
    btnLogin.classList.remove('exit')
    btnLogin.classList.add('login')

    authTextDiv.classList.remove('hide')
    btnShowNotes.disabled = true
    regBtn.classList.remove('hide')
    authUlBlock.innerHTML = ''

  } else if (event.target.classList.contains('show-notes')) {
    const res = await getNotes()
    let html = ''
    for (let key in res) {
      html += `<li>${res[key].name}</li>`
    }
    authUlBlock.innerHTML = html
    btnShowNotes.disabled = true
  } else if(event.target.id === 'record-clear-btn'){
    event.preventDefault()
  }
}






















