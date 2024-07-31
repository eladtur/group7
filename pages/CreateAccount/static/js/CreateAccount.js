
document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('create-account-form');

    createAccountForm.addEventListener('submit', async(event) => {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value;

        console.log('Form Submitted:', { fullName, email, password, confirmPassword, phone });

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

         try {
            const response = await fetch('http://127.0.0.1:5000/CreateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CustomerEmail: email,
                    Password: password,
                    Name: fullName,
                    Phone: phone
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Account created successfully!');
                window.location.href = '/';
            } else {
                alert(result.message || 'An error occurred while creating the account.');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            alert('An error occurred while creating the account.');
        }
    });
});
