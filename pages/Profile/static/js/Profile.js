document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('full-name').value = user.fullName;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;

        const ordersContainer = document.getElementById('orders-container');
        const userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
        if (userOrders.length > 0) {
            ordersContainer.innerHTML = '';
            userOrders.forEach(order => {
                let orderDetails = '';
                order.items.forEach(item => {
                    orderDetails += `
                        <p><strong>Cake:</strong> ${item.name}</p>
                        <p><strong>Quantity:</strong> ${item.quantity}</p>
                        <p><strong>Price per unit:</strong> $${item.price.toFixed(2)}</p>
                        <hr>
                    `;
                });

                const orderHTML = `
                    <div class="order">
                        <h3>Order #${order.orderId}</h3>
                        <p><strong>Date:</strong> ${order.date}</p>
                        ${orderDetails}
                        <p><strong>Total Price:</strong> $${order.totalPrice}</p>
                    </div>
                `;
                ordersContainer.innerHTML += orderHTML;
            });
        } else {
            ordersContainer.innerHTML = '<p>No orders have been made yet.</p>';
        }
    } else {
        alert('You must be logged in to view your profile.');
        window.location.href = '/Login';
    }
});
