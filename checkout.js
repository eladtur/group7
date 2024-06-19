document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const orderIdInput = document.getElementById('orderId');
    const orderDateInput = document.getElementById('orderDate');

    // Set order ID and order date when the DOM is loaded
    orderIdInput.value = generateOrderId();
    orderDateInput.value = getCurrentDate();

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
            const ccExpiration = document.getElementById('ccExpiration').value;
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
                ccExpiration,
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

function validateForm() {
    // Basic form validation
    const city = document.getElementById('city').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const streetName = document.getElementById('streetName').value;
    const zipCode = document.getElementById('zipCode').value;
    const ccType = document.getElementById('ccType').value;
    const ccNumber = document.getElementById('ccNumber').value;
    const ccExpiration = document.getElementById('ccExpiration').value;
    const ccCVC = document.getElementById('ccCVC').value;
    const customerEmail = document.getElementById('customerEmail').value;

    if (city === "" || houseNumber === "" || streetName === "" || zipCode === "" ||
        ccType === "" || ccNumber === "" || ccExpiration === "" || ccCVC === "" ||
        customerEmail === "") {
        alert("Please fill in all fields.");
        return false;
    }

    return true;
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
