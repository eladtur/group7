
document.addEventListener('DOMContentLoaded', async () => {
    const cartItemsContainer = document.getElementById('cart-items');

    try {
        const response = await fetch('/get_cart_item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const cart = await response.json();
            const cartItems = cart.items || [];

            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
            } else {
                renderCartItems(cartItemsContainer, cartItems);
                updateTotalPrice(cartItems);
            }
        } else {
            const result = await response.json();
            console.error('Error loading cart items:', result.message);
            cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
        cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
    }
});

function renderCartItems(container, items) {
    container.innerHTML = ''; // Clear the container before adding items
    items.forEach((item, index) => {
        const cartItemHTML = createCartItemHTML(item, index);
        container.innerHTML += cartItemHTML;
    });
}

function createCartItemHTML(item, index) {
    return `
        <div class="cart-item" data-id="${item.product_id}">
            <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Base: ${item.base}</p>
                <p>Cream: ${item.cream}</p>
                <p>Dietary Preference: ${item.dietaryPreference}</p>
                <p>Inscription: ${item.inscription}</p>
                <div class="quantity">
                    <label for="quantity${index}">Quantity</label>
                    <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity('${item.product_id}', this.value)">
                </div>
                <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-button" onclick="removeFromCart('${item.product_id}')">Remove</button>
            </div>
        </div>
    `;
}

async function updateQuantity(id, quantity) {
    try {
        const response = await fetch('/update-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, quantity: parseInt(quantity) }),
            credentials: 'include'
        });

        if (response.ok) {
            location.reload();
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        alert('An error occurred while updating the cart item quantity. Please try again later.');
    }
}

async function removeFromCart(id) {
    try {
        const response = await fetch('/delete-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, quantity: 1 }), // Set quantity to 1 for complete removal
            credentials: 'include'
        });

        if (response.ok) {
            location.reload();
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
        alert('An error occurred while removing the cart item. Please try again later.');
    }
}

function updateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
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

async function handleOrder(event, type) {
    event.preventDefault();
    try {
        const response = await fetch('/get_cart_item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const cart = await response.json();
            const cartItems = cart.items || [];

            if (cartItems.length === 0) {
                alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
                return false;
            } else {
                const orderDetails = {
                    items: cartItems,
                    totalPrice: document.getElementById('totalPrice').innerText.replace('Total Price: $', '')
                };

                sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

                if (type === 'checkout') {
                    window.location.href = '/checkout';
                } else {
                    window.location.href = '/confirmation';
                }
            }
        } else {
            alert('Error loading cart items. Please try again later.');
        }
    } catch (error) {
        console.error('Error handling order:', error);
        alert('An error occurred while processing your order. Please try again later.');
    }
}
