import {Form} from "./form";

const HTML = `          
   <input type="email" id="email" required placeholder="email">
   <p id="p-text-mail" class="p-text hide">такой емайл не найден</p>

   <input type="password" id="password" required placeholder="password">
   <p id="p-text-pass" class="p-text hide">неверный пароль</p>
   
   <button type="submit" id="submit">Отправить</button>
   <div class="answer hide">данные отправлены</div>
`


const API_KEY = 'AIzaSyDVIX-1unHjv4pgIwxJv1KH1QzM9KBUI1M'
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

export class AuthForm extends Form {
  constructor(parentModal) {
    super(parentModal, URL, HTML, 'войти');
  }
}
