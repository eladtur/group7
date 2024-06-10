function buyNow() {
    // Get form inputs
    var cakeBase = document.getElementById("cake-base").value;
    var cream = document.getElementById("cream").value;
    var dietaryPreference = document.getElementById("dietary-preference").value;
    var inscription = document.getElementById("inscription").value;
    var quantity = document.getElementById("quantity").value;

    // Fetch the selected cake details from sessionStorage
    const selectedCake = JSON.parse(sessionStorage.getItem('selectedCake'));

    if (selectedCake) {
        // Populate the HTML elements with the cake details
        document.getElementById('cake-image').src = selectedCake.image;
        document.getElementById('cake-name').textContent = selectedCake.name;
        document.getElementById('cake-description').textContent = selectedCake.description;
        document.getElementById('cake-price').textContent = `$${selectedCake.price}`;
    } else {
        // Handle the case where no cake is selected
        document.querySelector('.cake-section').innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
    }

    // Simple validation
    if (cakeBase === "" || cream === "" || dietaryPreference === "" || inscription === "" || quantity === "") {
        alert("Please fill in all fields.");
        return false;
    } else {
        // Proceed with buying the cake
        // You can add your logic here, such as sending form data to the server
        alert("Cake bought successfully!");
    }
}

function addToCart() {
    // Get form inputs
    var cakeBase = document.getElementById("cake-base").value;
    var cream = document.getElementById("cream").value;
    var dietaryPreference = document.getElementById("dietary-preference").value;
    var inscription = document.getElementById("inscription").value;
    var quantity = document.getElementById("quantity").value;

    // Simple validation
    if (cakeBase === "" || cream === "" || dietaryPreference === "" || inscription === "" || quantity === "") {
        alert("Please fill in all fields.");
        return false;
    } else {
        // Proceed with adding the cake to the cart
        // You can add your logic here, such as updating the cart display
        alert("Cake added to cart successfully!");
    }
}
// function viewCakeDetails(cake) {
//     // Save the selected cake details to sessionStorage
//     sessionStorage.setItem('selectedCake', JSON.stringify(cake));
//     // Redirect to cake design page
//     window.location.href = 'cakeDesign.html';
// }
//
// if (selectedCake) {
//     // Populate the HTML elements with the cake details
//     document.getElementById('cake-image').src = selectedCake.image;
//     document.getElementById('cake-name').textContent = selectedCake.name;
//     document.getElementById('cake-description').textContent = selectedCake.description;
//     document.getElementById('cake-price').textContent = `$${selectedCake.price}`;
// } else {
//     // Handle the case where no cake is selected
//     document.querySelector('.cake-section').innerHTML = '<p>No cake selected. Please go back to the catalog and select a cake.</p>';
// }

    // Retrieve the selected cake details from sessionStorage
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