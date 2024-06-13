document.addEventListener('DOMContentLoaded', () => {
    const selectedCake = JSON.parse(sessionStorage.getItem('selectedCake'));
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

    // Proceed with adding the cake to the cart
    alert("Cake added to cart successfully!");

    // Redirect to cart.html
    window.location.href = 'cart.html';

}


function addToCart() {
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

    // Proceed with adding the cake to the cart
    alert("Cake added to cart successfully!");

}
