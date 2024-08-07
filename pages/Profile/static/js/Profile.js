
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const userResponse = await fetch('/get_user_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // This ensures cookies are sent with the request
        });

        if (userResponse.ok) {
            const user = await userResponse.json();
            console.log("In profile.js.  user=", user);
            document.getElementById('full-name').value = user.Name;
            document.getElementById('email').value = user.CustomerEmail;
            document.getElementById('phone').value = user.Phone;

            const ordersResponse = await fetch('/get_user_orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            const ordersContainer = document.getElementById('orders-container');
            if (ordersResponse.ok) {
                const userOrders = await ordersResponse.json();
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
                                <p><strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}</p>
                            </div>
                        `;
                        ordersContainer.innerHTML += orderHTML;
                    });
                } else {
                    ordersContainer.innerHTML = '<p>No orders have been made yet.</p>';
                }
            } else {
                ordersContainer.innerHTML = '<p>Error fetching orders. Please try again later.</p>';
            }
        } else {
            alert('You must be logged in to view your profile.');
            window.location.href = '/Login';
        }
    } catch (error) {
        console.error('Error fetching user information or orders:', error);
        alert('An error occurred while fetching your profile information. Please try again later.');
        window.location.href = '/Login';
    }
});

