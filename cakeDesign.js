const selectedCake = JSON.parse(sessionStorage.getItem('selectedCake'));
document.addEventListener('DOMContentLoaded', () => {

    if (selectedCake) {
        document.getElementById('cake-details').innerHTML = `
            <img src="${selectedCake.image}" alt="${selectedCake.name}">
            <h2>${selectedCake.name}</h2>
            <p>${selectedCake.description}</p>
            <p class="price">$${selectedCake.price}</p>
        `;
    } else {
        document.getElementById('cake-details').innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
    }
});

function buyNow() {
   // Get form inputs
    var cakeBase = document.getElementById("cake-base").value;
    var cream = document.getElementById("cream").value;
    var dietaryPreference = document.getElementById("dietary-preference").value;
    var inscription = document.getElementById("inscription").value;
    var quantity = document.getElementById("quantity").value;

    // Simple validation
    if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Create an object to store cake details
    var selectedToBuyCake = {
        cakeBase: cakeBase,
        cream: cream,
        dietaryPreference: dietaryPreference,
        inscription: inscription,
        quantity: quantity
    };

    // Store the cake details in sessionStorage
    sessionStorage.setItem('selectedToBuyCake', JSON.stringify(selectedToBuyCake));

    // Redirect to cart.html
    window.location.href = 'checkout.html';

}

function addToCart() {
    var cakeBase = document.getElementById("cake-base").value;
    var cream = document.getElementById("cream").value;
    var dietaryPreference = document.getElementById("dietary-preference").value;
    var inscription = document.getElementById("inscription").value;
    var quantity = parseInt(document.getElementById("quantity").value);

    if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity <= 1) {
        alert("Please fill in quantity.");
        return;
    }

    var cake = {
        id: new Date().getTime(),
        name: `${cakeBase} Cake`,
        image: selectedCake.image ,
        base: cakeBase,
        cream: cream,
        dietaryPreference: dietaryPreference,
        inscription: inscription,
        quantity: quantity,
        price: 100 // Example price, replace with actual logic
    };
 if (quantity >= 1) {

     var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     cartItems.push(cake);
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     alert("Cake added to cart successfully!");

 }
 else
     alert("Please fill in quantity.");
        return;
}



//
// function addToCart() {
//     // Get form inputs
//     var cakeBase = document.getElementById("cake-base").value;
//     var cream = document.getElementById("cream").value;
//     var dietaryPreference = document.getElementById("dietary-preference").value;
//     var inscription = document.getElementById("inscription").value;
//     var quantity = document.getElementById("quantity").value;
//
//     // Simple validation
//     if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
//         alert("Please fill in all fields.");
//         return false;
//     }
//
//     // Create an object to store cake details
//     var selectedToBuyCake = {
//         cakeBase: cakeBase,
//         cream: cream,
//         dietaryPreference: dietaryPreference,
//         inscription: inscription,
//         quantity: quantity
//     };
//
//     // Store the cake details in sessionStorage
//     sessionStorage.setItem('selectedToBuyCake', JSON.stringify(selectedToBuyCake));
//
//     // Proceed with adding the cake to the cart
//     alert("Cake added to cart successfully!");
//
// }
