document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.querySelector('.reviews');

    const preExistingReviews = [
        {
            name: "John Doe",
            email: "john@example.com",
            message: "Great cakes and excellent service!",
            rating: 5,
            date: "01/10/2023"
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            message: "I loved the chocolate cake!",
            rating: 4,
            date: "02/10/2023"
        }
    ];

    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify(preExistingReviews));
    }

    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewHTML = `
                <div class="review">
                    <div class="review-header">
                        <span class="name">${review.name}</span>
                        <div class="rating">
                            ${'★'.repeat(review.rating).padEnd(5, '☆')}
                        </div>
                    </div>
                    <div class="date">${review.date}</div>
                    <div class="message">${review.message}</div>
                </div>
            `;
            reviewsContainer.innerHTML += reviewHTML;
        });
    };

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const newReview = {
            name,
            email,
            message,
            rating: parseInt(rating),
            date: new Date().toLocaleDateString()
        };

        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.unshift(newReview); // Add the new review to the top
        localStorage.setItem('reviews', JSON.stringify(reviews));

        document.getElementById('message').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;

        loadReviews();
    });

    loadReviews();
});
