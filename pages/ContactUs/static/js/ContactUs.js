document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message) {
            alert('All fields are required.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    });
});
