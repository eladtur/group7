document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const time = document.getElementById('time').value;
    const preference = document.getElementById('preference').value;
    const date = document.getElementById('date').value;
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

    // Save appointment data (Here we just log it, but you can save it to a database)
    const appointmentData = {
        name,
        telephone,
        email,
        time,
        preference,
        date,
        comment
    };

    console.log("Appointment Data: ", appointmentData);
    alert("Appointment set successfully!");

    // Clear the form
    document.getElementById('appointment-form').reset();
});
