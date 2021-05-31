const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const messagesEl = document.getElementsByClassName('messages')[0];

document.getElementsByTagName('button')[0].addEventListener('click', () => {
    messagesEl.innerHTML = '';

    const user = JSON.parse(localStorage.user);
    const username = usernameEl.value;
    const password = passwordEl.value;

    const message = document.createElement('h2');
    
    if (username === '') {
        message.innerText = 'You shoud enter a username';
        messagesEl.appendChild(message)
    } else if (password === '') {
        message.innerText = 'You shoud enter a password';
        messagesEl.appendChild(message)
    } else if (user.username != username || user.password != password) {
        message.innerText = 'You have entered an invalid username or password';
        messagesEl.appendChild(message)
    } else {
        localStorage.loggedIn='true';
        window.location.href = './restaurants.html';
    }
})