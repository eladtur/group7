// document.addEventListener('DOMContentLoaded', () => {
//     const reviewForm = document.getElementById('review-form');
//     const reviewsContainer = document.querySelector('.reviews');
//
//     const preExistingReviews = [
//         {
//             name: "John Doe",
//             email: "john@example.com",
//             message: "Great cakes and excellent service!",
//             rating: 5,
//             date: "01/10/2023"
//         },
//         {
//             name: "Jane Smith",
//             email: "jane@example.com",
//             message: "I loved the chocolate cake!",
//             rating: 4,
//             date: "02/10/2023"
//         }
//     ];
//
//     if (!localStorage.getItem('reviews')) {
//         localStorage.setItem('reviews', JSON.stringify(preExistingReviews));
//     }
//
//     const loadReviews = () => {
//         const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         reviewsContainer.innerHTML = '';
//         reviews.forEach(review => {
//             const reviewHTML = `
//                 <div class="review">
//                     <div class="review-header">
//                         <span class="name">${review.name}</span>
//                         <div class="rating">
//                             ${'★'.repeat(review.rating).padEnd(5, '☆')}
//                         </div>
//                     </div>
//                     <div class="date">${review.date}</div>
//                     <div class="message">${review.message}</div>
//                 </div>
//             `;
//             reviewsContainer.innerHTML += reviewHTML;
//         });
//     };
//
//     reviewForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
//         const rating = document.querySelector('input[name="rating"]:checked').value;
//
//         const newReview = {
//             name,
//             email,
//             message,
//             rating: parseInt(rating),
//             date: new Date().toLocaleDateString()
//         };
//
//         const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         reviews.unshift(newReview); // Add the new review to the top
//         localStorage.setItem('reviews', JSON.stringify(reviews));
//
//         // Clear form fields
//         reviewForm.reset();
//
//         loadReviews();
//     });
//
//     loadReviews();
// });

document.addEventListener('DOMContentLoaded', async () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.querySelector('.reviews');

    // Fetch logged-in user details
    let user = null;
    try {
        const userResponse = await fetch('/get_user_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // This ensures cookies are sent with the request
        });

        if (userResponse.ok) {
            user = await userResponse.json();
        } else {
            alert('You must be logged in to submit a review.');
            window.location.href = '/Login';
            return;
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        alert('An error occurred while fetching your information. Please try again later.');
        window.location.href = '/Login';
        return;
    }

    // Load existing reviews from the database
    const loadReviews = async () => {
        try {
            const response = await fetch('/reviews', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // This ensures cookies are sent with the request
            });

            if (response.ok) {
                const reviews = await response.json();
                reviewsContainer.innerHTML = '';
                reviews.forEach(review => {
                    const reviewHTML = `
                        <div class="review">
                            <div class="review-header">
                                <span class="name">${review.Name}</span>
                                <div class="rating">
                                    ${'★'.repeat(review.Stars).padEnd(5, '☆')}
                                </div>
                            </div>
                            <div class="date">${new Date(review.Date).toLocaleDateString()}</div>
                            <div class="message">${review.ReviewText}</div>
                        </div>
                    `;
                    reviewsContainer.innerHTML += reviewHTML;
                });
            } else {
                console.error('Failed to load reviews:', response.statusText);
                reviewsContainer.innerHTML = '<p>Error loading reviews. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
            reviewsContainer.innerHTML = '<p>Error loading reviews. Please try again later.</p>';
        }
    };

    reviewForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const message = document.getElementById('message').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const newReview = {
            CustomerEmail: user.CustomerEmail,
            Name: user.Name,
            ReviewText: message,
            Stars: parseInt(rating),
            Date: new Date().toISOString()
        };

        try {
            const response = await fetch('/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
                credentials: 'include' // This ensures cookies are sent with the request
            });

            if (response.ok) {
                reviewForm.reset();
                loadReviews();
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting your review. Please try again later.');
        }
    });

    loadReviews();
});
