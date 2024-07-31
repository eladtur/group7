// document.addEventListener('DOMContentLoaded', () => {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const cartItemsContainer = document.getElementById('cart-items');
//
//     if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
//     } else {
//         cartItems.forEach((item, index) => {
//             const cartItemHTML = `
//                 <div class="cart-item" data-id="${item.id}">
//                     <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
//                     <div class="cart-details">
//                         <h3>${item.name}</h3>
//                         <p>Base: ${item.base}</p>
//                         <p>Cream: ${item.cream}</p>
//                         <p>Dietary Preference: ${item.dietaryPreference}</p>
//                         <p>Inscription: ${item.inscription}</p>
//                         <div class="quantity">
//                             <label for="quantity${index}">Quantity</label>
//                             <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
//                         </div>
//                         <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
//                         <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
//                     </div>
//                 </div>
//             `;
//             cartItemsContainer.innerHTML += cartItemHTML;
//         });
//
//         updateTotalPrice(cartItems);
//     }
// });
//
// function updateQuantity(id, quantity) {
//     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     cartItems = cartItems.map(item => {
//         if (item.id === id) {
//             item.quantity = parseInt(quantity);
//         }
//         return item;
//     });
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     location.reload();
// }
//
// function removeFromCart(id) {
//     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     cartItems = cartItems.filter(item => item.id !== id);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     location.reload();
// }
//
// function updateTotalPrice(cartItems) {
//     let totalPrice = 0;
//     cartItems.forEach(item => {
//         totalPrice += item.price * item.quantity;
//     });
//     document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
//     // Store total price in localStorage
//     localStorage.setItem('totalPrice', totalPrice.toFixed(2));
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     const checkoutButton = document.getElementById('checkout-button');
//     const buyNowButton = document.getElementById('buy-now-button');
//
//     checkoutButton.addEventListener('click', function(event) {
//         handleOrder(event, 'checkout');
//     });
//
//     if (buyNowButton) {
//         buyNowButton.addEventListener('click', function(event) {
//             handleOrder(event, 'buy-now');
//         });
//     }
// });
//
// function handleOrder(event, type) {
//     event.preventDefault();
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     if (cartItems.length === 0) {
//         alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
//         return false;
//     } else {
//         const user = JSON.parse(localStorage.getItem('loggedInUser'));
//         if (user) {
//             let userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
//             const orderDetails = {
//                 orderId: generateOrderId(),
//                 date: new Date().toISOString().split('T')[0],
//                 items: cartItems,
//                 totalPrice: localStorage.getItem('totalPrice')
//             };
//             userOrders.push(orderDetails);
//             localStorage.setItem(`orders_${user.email}`, JSON.stringify(userOrders));
//         }
//         localStorage.setItem('cartItems', JSON.stringify([]));
//         localStorage.setItem('currentOrder', JSON.stringify(cartItems));
//
//         if (type === 'checkout') {
//             window.location.href = '/checkout';
//         } else {
//             window.location.href = '/confirmation';
//         }
//     }
// }
//
// function generateOrderId() {
//     return Math.floor(Math.random() * 1000000) + 1;
// }
//
//
// /*fetch('/insert-cart-item', {
//         method: 'POST',
//         body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include' // This ensures cookies are sent with the request
//     })
// /*
// fetch('/delete-cart-item', {
//         method: 'POST',
//         body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include' // This ensures cookies are sent with the request
//     })
//  */

//
// document.addEventListener('DOMContentLoaded', async () => {
//   const cartItemsContainer = document.getElementById('cart-items');
//
//   try {
//     const response = await fetch('/get_user_cart', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include' // Ensure cookies are sent with the request
//     });
//     // /*fetch('/insert-cart-item', {
// //         method: 'POST',
// //         body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         credentials: 'include' // This ensures cookies are sent with the request
// //     })
//
//     if (response.ok) {
//       const cartItems = await response.json();
//
//       if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
//       } else {
//         cartItems.forEach((item, index) => {
//           const cartItemHTML = `
//             <div class="cart-item" data-id="${item.id}">
//               <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
//               <div class="cart-details">
//                 <h3>${item.name}</h3>
//                 <p>Base: ${item.base}</p>
//                 <p>Cream: ${item.cream}</p>
//                 <p>Dietary Preference: ${item.dietaryPreference}</p>
//                 <p>Inscription: ${item.inscription}</p>
//                 <div class="quantity">
//                   <label for="quantity${index}">Quantity</label>
//                   <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
//                 </div>
//                 <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
//                 <button class="remove-button" onclick="removeFromCart('${item.id}')">Remove</button>
//               </div>
//             </div>
//           `;
//           cartItemsContainer.innerHTML += cartItemHTML;
//         });
//
//         updateTotalPrice(cartItems);
//       }
//     } else {
//       cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
//     }
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
//   }
// });
//
// async function updateQuantity(id, quantity) {
//   try {
//     const response = await fetch('/update-cart-item', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id, quantity }),
//       credentials: 'include'
//     });
//
//     if (response.ok) {
//       location.reload();
//     } else {
//       const result = await response.json();
//       alert(result.message);
//     }
//   } catch (error) {
//     console.error('Error updating cart item quantity:', error);
//     alert('An error occurred while updating the cart item quantity. Please try again later.');
//   }
// }
//
// async function removeFromCart(id) {
//   try {
//     const response = await fetch('/delete-cart-item', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id }),
//       credentials: 'include'
//     });
//
//     if (response.ok) {
//       location.reload();
//     } else {
//       const result = await response.json();
//       alert(result.message);
//     }
//   } catch (error) {
//     console.error('Error removing cart item:', error);
//     alert('An error occurred while removing the cart item. Please try again later.');
//   }
// }
//
// function updateTotalPrice(cartItems) {
//   let totalPrice = 0;
//   cartItems.forEach(item => {
//     totalPrice += item.price * item.quantity;
//   });
//   document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
// }
//
//  // /*fetch('/insert-cart-item', {
// //         method: 'POST',
// //         body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         credentials: 'include' // This ensures cookies are sent with the request
// //     })
// async function addToCart(id) {
//   try {
//     const response = await fetch('/insert-cart-item', {
//       method: 'POST',
//       body: JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
//
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include'
//     });
//     if (response.ok) {
//       location.reload();
//     } else {
//       const result = await response.json();
//       alert(result.message);
//     }
//   } catch (error) {
//     console.error('Error removing cart item:', error);
//     alert('An error occurred while removing the cart item. Please try again later.');
//   }
// }
// //
//
// document.addEventListener('DOMContentLoaded', async () => {
//     const cartItemsContainer = document.getElementById('cart-items');
//
//     try {
//         const response = await fetch('/get_cart_item', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include' // Ensure cookies are sent with the request
//         });
//
//         if (response.ok) {
//             const cart = await response.json();
//             const cartItems = cart.items || [];
//
//             if (cartItems.length === 0) {
//                 cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
//             } else {
//                 cartItems.forEach((item, index) => {
//                     const cartItemHTML = `
//                         <div class="cart-item" data-id="${item.product_id}">
//                             <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
//                             <div class="cart-details">
//                                 <h3>${item.name}</h3>
//                                 <p>Base: ${item.base}</p>
//                                 <p>Cream: ${item.cream}</p>
//                                 <p>Dietary Preference: ${item.dietaryPreference}</p>
//                                 <p>Inscription: ${item.inscription}</p>
//                                 <div class="quantity">
//                                     <label for="quantity${index}">Quantity</label>
//                                     <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity('${item.product_id}', this.value)">
//                                 </div>
//                                 <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
//                                 <button class="remove-button" onclick="removeFromCart('${item.product_id}')">Remove</button>
//                             </div>
//                         </div>
//                     `;
//                     cartItemsContainer.innerHTML += cartItemHTML;
//                 });
//
//                 updateTotalPrice(cartItems);
//             }
//         } else {
//             cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
//         }
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
//     }
// });
//
// async function updateQuantity(id, quantity) {
//     try {
//         const response = await fetch('/update-cart-item', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ product_id: id, quantity: parseInt(quantity) }),
//             credentials: 'include'
//         });
//
//         if (response.ok) {
//             location.reload();
//         } else {
//             const result = await response.json();
//             alert(result.message);
//         }
//     } catch (error) {
//         console.error('Error updating cart item quantity:', error);
//         alert('An error occurred while updating the cart item quantity. Please try again later.');
//     }
// }
//
// async function removeFromCart(id) {
//     try {
//         const response = await fetch('/delete-cart-item', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ product_id: id, quantity: 1 }), // Set quantity to 1 for complete removal
//             credentials: 'include'
//         });
//
//         if (response.ok) {
//             location.reload();
//         } else {
//             const result = await response.json();
//             alert(result.message);
//         }
//     } catch (error) {
//         console.error('Error removing cart item:', error);
//         alert('An error occurred while removing the cart item. Please try again later.');
//     }
// }
//
// function updateTotalPrice(cartItems) {
//     let totalPrice = 0;
//     cartItems.forEach(item => {
//         totalPrice += item.price * item.quantity;
//     });
//     document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     const checkoutButton = document.getElementById('checkout-button');
//     const buyNowButton = document.getElementById('buy-now-button');
//
//     checkoutButton.addEventListener('click', function(event) {
//         handleOrder(event, 'checkout');
//     });
//
//     if (buyNowButton) {
//         buyNowButton.addEventListener('click', function(event) {
//             handleOrder(event, 'buy-now');
//         });
//     }
// });
//
// async function handleOrder(event, type) {
//     event.preventDefault();
//     try {
//         const response = await fetch('/get_cart_item', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include' // Ensure cookies are sent with the request
//         });
//
//         if (response.ok) {
//             const cart = await response.json();
//             const cartItems = cart.items || [];
//
//             if (cartItems.length === 0) {
//                 alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
//                 return false;
//             } else {
//                 const orderDetails = {
//                     items: cartItems,
//                     totalPrice: document.getElementById('totalPrice').innerText.replace('Total Price: $', '')
//                 };
//
//                 sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
//
//                 if (type === 'checkout') {
//                     window.location.href = '/checkout';
//                 } else {
//                     window.location.href = '/confirmation';
//                 }
//             }
//         } else {
//             alert('Error loading cart items. Please try again later.');
//         }
//     } catch (error) {
//         console.error('Error handling order:', error);
//         alert('An error occurred while processing your order. Please try again later.');
//     }
// }
//
// function generateOrderId() {
//     return Math.floor(Math.random() * 1000000) + 1;
// }
document.addEventListener('DOMContentLoaded', async () => {
    const cartItemsContainer = document.getElementById('cart-items');

    try {
        const response = await fetch('/get_cart_item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const cart = await response.json();
            const cartItems = cart.items || [];

            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<p>No cakes added to the cart yet.</p>';
            } else {
                renderCartItems(cartItemsContainer, cartItems);
                updateTotalPrice(cartItems);
            }
        } else {
            const result = await response.json();
            console.error('Error loading cart items:', result.message);
            cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
        cartItemsContainer.innerHTML = '<p>Error loading cart items. Please try again later.</p>';
    }
});

function renderCartItems(container, items) {
    container.innerHTML = ''; // Clear the container before adding items
    items.forEach((item, index) => {
        const cartItemHTML = createCartItemHTML(item, index);
        container.innerHTML += cartItemHTML;
    });
}

function createCartItemHTML(item, index) {
    return `
        <div class="cart-item" data-id="${item.product_id}">
            <img src="${item.image}" alt="Cake Image" style="width: 100px; height: 100px;">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Base: ${item.base}</p>
                <p>Cream: ${item.cream}</p>
                <p>Dietary Preference: ${item.dietaryPreference}</p>
                <p>Inscription: ${item.inscription}</p>
                <div class="quantity">
                    <label for="quantity${index}">Quantity</label>
                    <input type="number" id="quantity${index}" value="${item.quantity}" min="1" onchange="updateQuantity('${item.product_id}', this.value)">
                </div>
                <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-button" onclick="removeFromCart('${item.product_id}')">Remove</button>
            </div>
        </div>
    `;
}

async function updateQuantity(id, quantity) {
    try {
        const response = await fetch('/update-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, quantity: parseInt(quantity) }),
            credentials: 'include'
        });

        if (response.ok) {
            location.reload();
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        alert('An error occurred while updating the cart item quantity. Please try again later.');
    }
}

async function removeFromCart(id) {
    try {
        const response = await fetch('/delete-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: id, quantity: 1 }), // Set quantity to 1 for complete removal
            credentials: 'include'
        });

        if (response.ok) {
            location.reload();
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
        alert('An error occurred while removing the cart item. Please try again later.');
    }
}

function updateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const buyNowButton = document.getElementById('buy-now-button');

    checkoutButton.addEventListener('click', function(event) {
        handleOrder(event, 'checkout');
    });

    if (buyNowButton) {
        buyNowButton.addEventListener('click', function(event) {
            handleOrder(event, 'buy-now');
        });
    }
});

async function handleOrder(event, type) {
    event.preventDefault();
    try {
        const response = await fetch('/get_cart_item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const cart = await response.json();
            const cartItems = cart.items || [];

            if (cartItems.length === 0) {
                alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
                return false;
            } else {
                const orderDetails = {
                    items: cartItems,
                    totalPrice: document.getElementById('totalPrice').innerText.replace('Total Price: $', '')
                };

                sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

                if (type === 'checkout') {
                    window.location.href = '/checkout';
                } else {
                    window.location.href = '/confirmation';
                }
            }
        } else {
            alert('Error loading cart items. Please try again later.');
        }
    } catch (error) {
        console.error('Error handling order:', error);
        alert('An error occurred while processing your order. Please try again later.');
    }
}
