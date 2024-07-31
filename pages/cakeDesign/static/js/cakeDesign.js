// const selectedCake = JSON.parse(sessionStorage.getItem('selectedCake'));
//
// document.addEventListener('DOMContentLoaded', () => {
//   const cakeDetailsElement = document.getElementById('cake-details');
//   if (selectedCake) {
//     cakeDetailsElement.innerHTML = `
//       <img src="${selectedCake.image}" alt="${selectedCake.name}">
//       <h2>${selectedCake.name}</h2>
//       <p>${selectedCake.description}</p>
//       <p class="price">$${selectedCake.price}</p>
//     `;
//   } else {
//     cakeDetailsElement.innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
//   }
// });
//
// function buyNow() {
//   const cakeBase = document.getElementById("cake-base").value;
//   const cream = document.getElementById("cream").value;
//   const dietaryPreference = document.getElementById("dietary-preference").value;
//   const inscription = document.getElementById("inscription").value;
//   const quantity = document.getElementById("quantity").value;
//
//   if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
//     alert("Please fill in all fields.");
//     return false;
//   }
//
//   const selectedToBuyCake = {
//     cakeBase: cakeBase,
//     cream: cream,
//     dietaryPreference: dietaryPreference,
//     inscription: inscription,
//     quantity: quantity
//   };
//
//   sessionStorage.setItem('selectedToBuyCake', JSON.stringify(selectedToBuyCake));
//
//   window.location.href = buyNowUrl;
// }
//
// function addToCart() {
//   const cakeBase = document.getElementById("cake-base").value;
//   const cream = document.getElementById("cream").value;
//   const dietaryPreference = document.getElementById("dietary-preference").value;
//   const inscription = document.getElementById("inscription").value;
//   const quantity = document.getElementById("quantity").value;
//
//   if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "" || parseInt(quantity) <= 0) {
//     alert("Please fill in all fields and ensure quantity is greater than zero.");
//     return;
//   }
//
//   const cake = {
//     id: new Date().getTime(),
//     name: selectedCake.name,
//     image: selectedCake.image,
//     base: cakeBase,
//     cream: cream,
//     dietaryPreference: dietaryPreference,
//     inscription: inscription,
//     quantity: parseInt(quantity),
//     price: selectedCake.price
//   };
//
//   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   cartItems.push(cake);
//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   alert("Cake added to cart successfully!");
// }

document.addEventListener('DOMContentLoaded', () => {
    const selectedCakeJSON = sessionStorage.getItem('selectedCake');
    if (!selectedCakeJSON) {
        console.error('No selected cake found in sessionStorage.');
        return;
    }

    const selectedCake = JSON.parse(selectedCakeJSON);
    console.log("Selected Cake:", selectedCake);

    const cakeDetailsElement = document.getElementById('cake-details');
    if (selectedCake) {
        cakeDetailsElement.innerHTML = `
            <img src="${selectedCake.image}" alt="${selectedCake.name}">
            <h2>${selectedCake.name}</h2>
            <p>${selectedCake.description}</p>
            <p class="price">$${selectedCake.price}</p>
        `;
    } else {
        cakeDetailsElement.innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
    }

    // Add event listeners for the buttons
    const addToCartButton = document.getElementById('add-to-cart-button');
    const buyNowButton = document.getElementById('buy-now-button');

    if (!addToCartButton || !buyNowButton) {
        console.error('Add to Cart or Buy Now button is not found in the DOM.');
        return;
    }

    addToCartButton.addEventListener('click', async () => {
        await addToCart(selectedCake);
    });

    buyNowButton.addEventListener('click', () => {
        buyNow(selectedCake);
    });
});

async function addToCart(selectedCake) {
    const cakeBase = document.getElementById("cake-base").value;
    const cream = document.getElementById("cream").value;
    const dietaryPreference = document.getElementById("dietary-preference").value;
    const inscription = document.getElementById("inscription").value;
    const quantity = document.getElementById("quantity").value;

    if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "" || parseInt(quantity) <= 0) {
        alert("Please fill in all fields and ensure quantity is greater than zero.");
        return;
    }

    const cake = {
        product_id: selectedCake.product_id,
        base: cakeBase,
        cream: cream,
        dietaryPreference: dietaryPreference,
        inscription: inscription,
        quantity: parseInt(quantity),
        price: selectedCake.price,
        name: selectedCake.name,
        image: selectedCake.image
    };

    console.log("Adding to Cart:", cake);

    try {
        const response = await fetch('/insert-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cake),
            credentials: 'include' // This ensures cookies are sent with the request
        });

        if (response.ok) {
            alert("Cake added to cart successfully!");
            window.location.href = '/cart'; // Redirect to the cart page
        } else {
            const result = await response.json();
            alert(result.message || "Failed to add cake to cart.");
        }
    } catch (error) {
        console.error('Error adding cake to cart:', error);
        alert('An error occurred while adding the cake to the cart. Please try again later.');
    }
}

function buyNow(selectedCake) {
    const cakeBase = document.getElementById("cake-base").value;
    const cream = document.getElementById("cream").value;
    const dietaryPreference = document.getElementById("dietary-preference").value;
    const inscription = document.getElementById("inscription").value;
    const quantity = document.getElementById("quantity").value;

    if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
        alert("Please fill in all fields.");
        return false;
    }

    const cake = {
        product_id: selectedCake.product_id,
        base: cakeBase,
        cream: cream,
        dietaryPreference: dietaryPreference,
        inscription: inscription,
        quantity: parseInt(quantity),
        price: selectedCake.price,
        name: selectedCake.name,
        image: selectedCake.image
    };

    sessionStorage.setItem('selectedToBuyCake', JSON.stringify(cake));
    window.location.href = '/checkout';
}
