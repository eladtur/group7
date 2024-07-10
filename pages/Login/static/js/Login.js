document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email);

        if (user) {
            if (user.password === password) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert('Invalid Password');
            }
        } else {
            alert('User does not exist. Please sign in first.');
        }
    });

    document.getElementById('signInButton').addEventListener('click', () => {
        window.location.href = 'CreateAccount.html';
    });
});
