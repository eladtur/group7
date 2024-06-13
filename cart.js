document.addEventListener('DOMContentLoaded', () => {
    // Retrieve selectedToBuyCake from sessionStorage
    const selectedToBuyCake = JSON.parse(sessionStorage.getItem('selectedToBuyCake'));

    if (selectedToBuyCake) {
        // Display selected cake details in the cart section
        const cartItemsContainer = document.getElementById('cart-items');

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${selectedToBuyCake.imag}" alt="Cake Image">
                <div class="cart-details">
                    <p>Cake Base: ${selectedToBuyCake.cakeBase}</p>
                    <p>Cream: ${selectedToBuyCake.cream}</p>
                    <p>Dietary Preference: ${selectedToBuyCake.dietaryPreference}</p>
                    <p>Inscription: ${selectedToBuyCake.inscription}</p>
                    <p>Quantity: ${selectedToBuyCake.quantity}</p>
                    <button class="remove-button">Remove</button>
                </div>
            </div>
        `;

        cartItemsContainer.innerHTML = cartItemHTML;

        // Calculate total price
        const totalPrice = calculateTotalPrice(selectedToBuyCake.quantity);
        document.getElementById('total-price').innerText = `Total Price: $${totalPrice}`;

        // Event listener for remove button
        const removeButton = document.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            sessionStorage.removeItem('selectedToBuyCake'); // Remove selectedToBuyCake from sessionStorage
            cartItemsContainer.innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
            document.getElementById('total-price').innerText = 'Total Price: $0';
        });
    } else {
        // Handle case where no cake is selected
        document.getElementById('cart-items').innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
    }
});

// Function to calculate total price
function calculateTotalPrice(quantity) {
    const pricePerCake = 100; // Assuming each cake costs $100
    return quantity * pricePerCake;
}
