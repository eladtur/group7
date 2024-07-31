
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("In login: email=", email);

        try {
            const response = await fetch('/login_action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ CustomerEmail: email, Password: password }),
                credentials: 'include' // This ensures cookies are sent with the request
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Login successful, redirecting to /home');
                window.location.href = '/home'; // Redirect to the home page after successful login
            } else {
                console.error('Error logging in:', result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    });

    document.getElementById('signInButton').addEventListener('click', () => {
        window.location.href = '/CreateAccount';
    });
});

