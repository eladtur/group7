document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const orderIdInput = document.getElementById('orderId');
    const orderDateInput = document.getElementById('orderDate');
    const monthSelect = document.getElementById('ccExpirationMonth');
    const yearSelect = document.getElementById('ccExpirationYear');

    orderIdInput.value = generateOrderId();
    orderDateInput.value = getCurrentDate();

    populateExpirationDateOptions(monthSelect, yearSelect);

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
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

            sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

            localStorage.removeItem('cartItems');
            console.log('Cart contents after clearing:', localStorage.getItem('cartItems'));

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
    const expirationDate = new Date(year, month - 1);
    return expirationDate > now;
}

function generateOrderId() {
    return Math.floor(Math.random() * 1000000) + 1;
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const totalPrice = localStorage.getItem('totalPrice') || '0.00';

document.getElementById('totalAmount').textContent = totalPrice;



function handleOrder(event) {
    event.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        return false;
    } else {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            let userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
            cartItems.forEach(item => {
                userOrders.push({
                    id: item.id,
                    name: item.name,
                    base: item.base,
                    cream: item.cream,
                    dietaryPreference: item.dietaryPreference,
                    inscription: item.inscription,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                });
            });
            localStorage.setItem(`orders_${user.email}`, JSON.stringify(userOrders));
        }
        localStorage.setItem('cartItems', JSON.stringify([]));

        localStorage.setItem('currentOrder', JSON.stringify(cartItems));

        window.location.href = 'confirmation.html';
    }
}

