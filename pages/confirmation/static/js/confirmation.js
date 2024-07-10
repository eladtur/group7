
document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

    if (orderDetails) {
        displayOrderDetails(orderDetails);
    } else {
        displayErrorMessage();
    }

    clearCart();
});

function displayOrderDetails(order) {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = `
        <p>The order has been successfully placed.</p>
        <p>Order number: ${order.orderId}</p>
        <p>Order date: ${order.orderDate}</p>
        <p>Delivery Address: ${order.streetName} ${order.houseNumber}, ${order.city}, ${order.zipCode}</p>
        <p>Thank you for placing an order with us. More details will be sent to your email: ${order.customerEmail}.</p>
    `;
}

function displayErrorMessage() {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = '<p>Unable to retrieve order details.</p>';
}

function clearCart() {
    localStorage.removeItem('cartItems');
    console.log('Cart contents after clearing:', localStorage.getItem('cartItems'));
}