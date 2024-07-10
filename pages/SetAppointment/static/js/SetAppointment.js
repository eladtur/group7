document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('In order to make an appointment you have to log in first');
        window.location.href = 'Login.html';
        return;
    }

    const appointmentForm = document.getElementById('appointment-form');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const disableBookedTimes = () => {
        const selectedDate = dateInput.value;
        const bookedTimes = appointments
            .filter(appointment => appointment.date === selectedDate)
            .map(appointment => appointment.time);

        Array.from(timeSelect.options).forEach(option => {
            if (bookedTimes.includes(option.value)) {
                option.disabled = true;
                option.textContent = `${option.value} (Booked)`;
            } else {
                option.disabled = false;
                option.textContent = option.value;
            }
        });
    };

    dateInput.addEventListener('change', disableBookedTimes);

    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const telephone = document.getElementById('telephone').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const preference = document.getElementById('preference').value;
        const comment = document.getElementById('comment').value;

        // Validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format!");
            return;
        }

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(telephone)) {
            alert("Invalid phone number!");
            return;
        }

        // Save appointment data
        const appointmentData = {
            name,
            telephone,
            email,
            date,
            time,
            preference,
            comment
        };

        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        console.log("Appointment Data: ", appointmentData);
        alert("Appointment set successfully!");

        document.getElementById('name').value = user.fullName;
        document.getElementById('telephone').value = user.phone;
        document.getElementById('email').value = user.email;

        Array.from(timeSelect.options).forEach(option => {
            option.disabled = false;
            option.textContent = option.value;
        });

        window.location.href = 'home.html';
    });

    document.getElementById('name').value = user.fullName;
    document.getElementById('telephone').value = user.phone;
    document.getElementById('email').value = user.email;
});
