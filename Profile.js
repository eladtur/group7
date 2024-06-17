document.addEventListener('DOMContentLoaded', function() {
    const profileData = {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        orders: [
            { id: "AC23457", image: "pics/BlossomingBeautyCake.jpeg" },
            { id: "AC23458", image: "pics/BlueBlossomCake.jpeg" },
            { id: "AC23459", image: "pics/DecadentDelightCake.jpeg" }
        ]
    };

    // Populate profile form with user data
    document.getElementById('full-name').value = profileData.fullName;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;

    // Populate orders section with user orders
    const ordersContainer = document.getElementById('orders-container');
    profileData.orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');
        orderElement.innerHTML = `
            <img src="${order.image}" alt="Cake Image">
            <p>#${order.id}</p>
        `;
        ordersContainer.appendChild(orderElement);
    });
});
