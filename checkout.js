document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const orderIdInput = document.getElementById('orderId');
    const orderDateInput = document.getElementById('orderDate');
    const monthSelect = document.getElementById('ccExpirationMonth');
    const yearSelect = document.getElementById('ccExpirationYear');

    // Set order ID and order date when the DOM is loaded
    orderIdInput.value = generateOrderId();
    orderDateInput.value = getCurrentDate();

    // Populate month and year dropdowns
    populateExpirationDateOptions(monthSelect, yearSelect);

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        if (validateForm()) {
            // Retrieve form data
            const orderId = orderIdInput.value;
            const orderDate = orderDateInput.value;
            const city = document.getElementById('city').value;
            const houseNumber = document.getElementById('houseNumber').value;
            const streetName = document.getElementById('streetName').value;
            const zipCode = document.getElementById('zipCode').value;
            const ccType = document.getElementById('ccType').value;
            const ccNumber = document.getElementById('ccNumber').value;
            const ccExpirationMonth = monthSelect.value;
            const ccExpirationYear = yearSelect.value;
            const ccCVC = document.getElementById('ccCVC').value;
            const customerEmail = document.getElementById('customerEmail').value;

            // Create order details object
            const orderDetails = {
                orderId,
                orderDate,
                city,
                houseNumber,
                streetName,
                zipCode,
                ccType,
                ccNumber,
                ccExpiration: `${ccExpirationMonth}/${ccExpirationYear}`,
                ccCVC,
                customerEmail
            };

            // Store order details in sessionStorage
            sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

            // Clear cart items from localStorage
            localStorage.removeItem('cartItems');
            console.log('Cart contents after clearing:', localStorage.getItem('cartItems'));

            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        }
    });
});

function populateExpirationDateOptions(monthSelect, yearSelect) {
    // Populate months
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month < 10 ? `0${month}` : month;
        option.text = month < 10 ? `0${month}` : month;
        monthSelect.appendChild(option);
    }

    // Populate years
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 20; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }
}

function validateForm() {
    const city = document.getElementById('city').value.trim();
    const houseNumber = document.getElementById('houseNumber').value.trim();
    const streetName = document.getElementById('streetName').value.trim();
    const zipCode = document.getElementById('zipCode').value.trim();
    const ccType = document.getElementById('ccType').value.trim();
    const ccNumber = document.getElementById('ccNumber').value.trim();
    const ccExpirationMonth = document.getElementById('ccExpirationMonth').value;
    const ccExpirationYear = document.getElementById('ccExpirationYear').value;
    const ccCVC = document.getElementById('ccCVC').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cityPattern = /^[\p{L}\s]+$/u;
    const streetPattern = /^[\p{L}\s]+$/u;
    const zipPattern = /^\d{7}$/;
    const ccNumberPattern = /^\d{16}$/;
    const ccCVCpattern = /^\d{3}$/;

    if (city === "" || houseNumber === "" || streetName === "" || zipCode === "" ||
        ccType === "" || ccNumber === "" || ccExpirationMonth === "" || ccExpirationYear === "" || ccCVC === "" ||
        customerEmail === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (!cityPattern.test(city)) {
        alert("Please enter a valid city name (letters only).");
        return false;
    }

    if (!streetPattern.test(streetName)) {
        alert("Please enter a valid street name (letters only).");
        return false;
    }

    if (!zipPattern.test(zipCode)) {
        alert("Please enter a valid postal code (7 digits).");
        return false;
    }

    if (!ccNumberPattern.test(ccNumber)) {
        alert("Please enter a valid credit card number (16 digits).");
        return false;
    }

    if (!ccCVCpattern.test(ccCVC)) {
        alert("Please enter a valid CVC number (3 digits).");
        return false;
    }

    if (!emailPattern.test(customerEmail)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!isValidExpirationDate(ccExpirationMonth, ccExpirationYear)) {
        alert("Please enter a valid expiration date (later than the current date).");
        return false;
    }

    return true;
}

function isValidExpirationDate(month, year) {
    const now = new Date();
    const expirationDate = new Date(year, month - 1); // Month is zero-indexed
    return expirationDate > now;
}

function generateOrderId() {
    return Math.floor(Math.random() * 1000000) + 1;
}

function getCurrentDate() {
    // Get current date formatted as yyyy-mm-dd
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero indexed
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// Retrieve total price from localStorage
const totalPrice = localStorage.getItem('totalPrice') || '0.00';

// Display total price in the tag
document.getElementById('totalAmount').textContent = totalPrice;
