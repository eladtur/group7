document.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();

    if (!fullName || !email || !password || !confirmPassword || !phone) {
        alert('All fields are required.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Phone number validation (Example: US phone number)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Check if email already exists (dummy check for illustration, replace with actual check)
    const existingEmails = ['test@example.com']; // Example array of existing emails
    if (existingEmails.includes(email)) {
        alert('This email is already in use. Please use a different email.');
        return;
    }

    // If all validations pass, proceed to create account
    alert('Account created successfully!');
    // Add logic to store user data or redirect to another page
});
