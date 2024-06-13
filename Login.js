document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signInButton = document.getElementById('signInButton');
    const loginButton = document.getElementById('loginButton');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Here you would typically send the login data to the server
        // For the sake of this example, let's just create a User object and log it to the console

        const user = {
            email: email,
            password: password
        };

        console.log('User logged in:', user);

        // Redirect to home page or another action
        window.location.href = 'home.html';
    });

    signInButton.addEventListener('click', function () {
        // Redirect to sign up page or another action
        window.location.href = 'signup.html';
    });
});
