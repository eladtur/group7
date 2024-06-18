

function validateForm() {


    // Basic form validation
    var orderId = document.getElementById('orderId').value;
    var orderDate = document.getElementById('orderDate').value;
    var city = document.getElementById('city').value;
    var houseNumber = document.getElementById('houseNumber').value;
    var streetName = document.getElementById('streetName').value;
    var zipCode = document.getElementById('zipCode').value;
    var ccType = document.getElementById('ccType').value;
    var ccNumber = document.getElementById('ccNumber').value;
    var ccExpiration = document.getElementById('ccExpiration').value;
    var ccCVC = document.getElementById('ccCVC').value;
    var customerEmail = document.getElementById('customerEmail').value;

    if (orderId === "" || orderDate === "" || city === "" || houseNumber === "" || streetName === "" ||
        zipCode === "" || ccType === "" || ccNumber === "" || ccExpiration === "" || ccCVC === "" ||
        customerEmail === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Additional validation logic can be added here (e.g., credit card number format, email validation)

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    // Set order ID and order date
    var orderIdInput = document.getElementById('orderId');
    var orderDateInput = document.getElementById('orderDate');

    orderIdInput.value = generateOrderId();
    orderDateInput.value = getCurrentDate();
});

function generateOrderId() {
    return Math.floor(Math.random() * 1000000) + 1;
}

function getCurrentDate() {
    // Get current date formatted as yyyy-mm-dd
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; // Month is zero indexed
    var day = now.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}
