const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');


const onLogin = e => {
  e.preventDefault();

  const data = new URLSearchParams();

  for (const pair of new FormData(loginForm)) {
      data.append(pair[0], pair[1]);
  }
 
  const config = {
    method: 'POST',
    body: data, 
  }

  fetch('/login', config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

const onRegister = e => {
  e.preventDefault();

  const data = new URLSearchParams();

  for (const pair of new FormData(registerForm)) {
      data.append(pair[0], pair[1]);
  }
 
  const config = {
    method: 'POST',
    body: data, 
  }

  fetch('/register', config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

if(loginBtn) loginBtn.addEventListener('click', onLogin);
if(registerBtn) registerBtn.addEventListener('click', onRegister);

