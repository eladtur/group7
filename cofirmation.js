document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderJSON = urlParams.get('order');

    if (orderJSON) {
        try {
            const order = JSON.parse(decodeURIComponent(orderJSON));
            displayOrderDetails(order);
        } catch (error) {
            console.error('Error parsing order JSON:', error);
            displayErrorMessage();
        }
    } else {
        displayErrorMessage();
    }
});

function displayOrderDetails(order) {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = `
        <p>The order has been successfully placed.</p>
        <p>Order ID: ${order.orderId}</p>
        <p>Order Date: ${order.orderDate}</p>
        <h2>Order Details</h2>
        <ul>
            <li>City: ${order.city}</li>
            <li>House Number: ${order.houseNumber}</li>
            <li>Street Name: ${order.streetName}</li>
            <li>Zip Code: ${order.zipCode}</li>
        </ul>
        <h2>Payment Details</h2>
        <ul>
            <li>Card Type: ${order.ccType}</li>
            <li>Card Number: ${order.ccNumber}</li>
            <li>Expiration Date: ${order.ccExpiration}</li>
            <li>CVC: ${order.ccCVC}</li>
            <li>Customer Email: ${order.customerEmail}</li>
        </ul>
        <p>Thank you for placing an order with us. More details will be sent to your email.</p>
    `;
}

function displayErrorMessage() {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = '<p>Unable to retrieve order details.</p>';
}
