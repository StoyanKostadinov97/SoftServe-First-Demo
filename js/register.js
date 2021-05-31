const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const repasswordEl = document.getElementById('repeat-password');
const emailEl = document.getElementById('email');
const messagesEl = document.getElementsByClassName('messages')[0];

document.getElementsByTagName('button')[0].addEventListener('click', () => {

    messagesEl.innerHTML = '';

    const username = usernameEl.value;
    const password = passwordEl.value;
    const repassword = repasswordEl.value;
    const email = emailEl.value;

    const message = document.createElement('h2');

    if (username === '') {
        message.innerText = 'You shoud enter a username';
        messagesEl.appendChild(message)
    } else if (password === '') {
        message.innerText = 'You shoud enter a password';
        messagesEl.appendChild(message)
    } else if (repassword === '') {
        message.innerText = 'You shoud repeat the password';
        messagesEl.appendChild(message)
    } else if (email === '') {
        message.innerText = 'You shoud enter an email';
        messagesEl.appendChild(message)
    } else if (password != repassword) {
        message.innerText = 'Your password and repeat password doesnt match';
        messagesEl.appendChild(message)
    } else {
        localStorage.user = JSON.stringify({
            'username': username,
            'password': password,
            'email': email
        });
        window.location.href = './login.html';
    }


})