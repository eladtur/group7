const selectedCake = JSON.parse(sessionStorage.getItem('selectedCake'));

document.addEventListener('DOMContentLoaded', () => {
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
});

function buyNow() {
  const cakeBase = document.getElementById("cake-base").value;
  const cream = document.getElementById("cream").value;
  const dietaryPreference = document.getElementById("dietary-preference").value;
  const inscription = document.getElementById("inscription").value;
  const quantity = document.getElementById("quantity").value;

  if (cakeBase === "" || cream === "" || dietaryPreference === "" || quantity === "") {
    alert("Please fill in all fields.");
    return false;
  }

  const selectedToBuyCake = {
    cakeBase: cakeBase,
    cream: cream,
    dietaryPreference: dietaryPreference,
    inscription: inscription,
    quantity: quantity
  };

  sessionStorage.setItem('selectedToBuyCake', JSON.stringify(selectedToBuyCake));

  window.location.href = buyNowUrl;
}

function addToCart() {
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
    id: new Date().getTime(),
    name: selectedCake.name,
    image: selectedCake.image,
    base: cakeBase,
    cream: cream,
    dietaryPreference: dietaryPreference,
    inscription: inscription,
    quantity: parseInt(quantity),
    price: selectedCake.price
  };

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(cake);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert("Cake added to cart successfully!");
}
