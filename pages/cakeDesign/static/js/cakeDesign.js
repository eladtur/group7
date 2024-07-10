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
    var cakeBase = document.getElementById("cake-base").value;
    var cream = document.getElementById("cream").value;
    var dietaryPreference = document.getElementById("dietary-preference").value;
    var inscription = document.getElementById("inscription").value;
    var quantity = document.getElementById("quantity").value;

    if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
        alert("Please fill in all fields.");
        return false;
    }

    var selectedToBuyCake = {
        cakeBase: cakeBase,
        cream: cream,
        dietaryPreference: dietaryPreference,
        inscription: inscription,
        quantity: quantity
    };

    sessionStorage.setItem('selectedToBuyCake', JSON.stringify(selectedToBuyCake));

    window.location.href = 'checkout.html';

}

function addToCart() {
  const cakeBase = document.getElementById("cake-base").value;
  const cream = document.getElementById("cream").value;
  const dietaryPreference = document.getElementById("dietary-preference").value;
  const inscription = document.getElementById("inscription").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity <= 0) {
    alert("Please fill in quantity.");
    return;
  }

  const cake = {
    id: new Date().getTime(),
    name: selectedCake.name,
    image: selectedCake.image,
    base: cakeBase,
    cream: cream,
    dietaryPreference: dietaryPreference,
    inscription: inscription,
    quantity: quantity,
    price: selectedCake.price
  };

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(cake);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert("Cake added to cart successfully!");
}