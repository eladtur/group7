document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
    } else {
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Base: ${item.base}</p>
                        <p>Cream: ${item.cream}</p>
                        <p>Dietary Preference: ${item.dietaryPreference}</p>
                        <p>Inscription: ${item.inscription}</p>
                        <div class="quantity">
                            <label for="quantity${index}">Quantity</label>
                            <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        </div>
                        <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });

        updateTotalPrice(cartItems);
    }
});

function updateQuantity(id, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.map(item => {
        if (item.id === id) {
            item.quantity = parseInt(quantity);
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();
}

function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();
}

function updateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    // Store total price in localStorage
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const buyNowButton = document.getElementById('buy-now-button');

    checkoutButton.addEventListener('click', function(event) {
        handleOrder(event, 'checkout');
    });

    if (buyNowButton) {
        buyNowButton.addEventListener('click', function(event) {
            handleOrder(event, 'buy-now');
        });
    }
});

function handleOrder(event, type) {
    event.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        return false;
    } else {

        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            let userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
            const orderDetails = {
                orderId: generateOrderId(),
                date: new Date().toISOString().split('T')[0],
                items: cartItems,
                totalPrice: localStorage.getItem('totalPrice')
            };
            userOrders.push(orderDetails);
            localStorage.setItem(`orders_${user.email}`, JSON.stringify(userOrders));
        }
        localStorage.setItem('cartItems', JSON.stringify([]));

        localStorage.setItem('currentOrder', JSON.stringify(cartItems));

        if (type === 'checkout') {
            window.location.href = 'checkout.html';
        } else {
            window.location.href = 'confirmation.html';
        }
    }
}

function generateOrderId() {
    return Math.floor(Math.random() * 1000000) + 1;
}
