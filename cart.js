// Function to remove an item from the cart
document.querySelectorAll('.remove-button').forEach(item => {
    item.addEventListener('click', event => {
        var cartItem = item.closest('.cart-item');
        cartItem.remove();
        updateTotalPrice(); // Call function to update total price
    });
});

// Function to update the total price
function updateTotalPrice() {
    var totalPrice = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        var quantity = parseInt(item.querySelector('input[type="number"]').value);
        totalPrice += (quantity * 100); // Assuming each cake costs $100
    });
    // Update total price display
    document.getElementById('total-price').innerText = "Total Price: $" + totalPrice;
}


// Call updateTotalPrice initially to display total price
updateTotalPrice();
