document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
    } else {
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="Cake Image">
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
                        <p class="price">Price: $${item.price * item.quantity}</p>
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
        totalPrice += (item.price * item.quantity);
    });
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice}`;
}
