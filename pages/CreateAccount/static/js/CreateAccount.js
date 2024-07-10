import User from '../../../../User.js';

document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('create-account-form');

    createAccountForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            alert('Email already exists!');
            return;
        }

        const newUser = new User(fullName, email, password, phone);
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        alert('Account created successfully!');

        window.location.href = 'home.html';
    });
});
