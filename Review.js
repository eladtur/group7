document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.querySelector('.reviews');

    // Sample reviews data
    const reviews = [
        { name: 'Alex', email: 'alex@example.com', message: 'Wow Wow Wow!!!', rating: 4, date: '2023-06-20' },
        { name: 'Shira', email: 'shira@example.com', message: 'Wow Wow Wow!!!', rating: 4, date: '2023-06-21' },
        { name: 'Jack', email: 'jack@example.com', message: 'Wow Wow Wow!!!', rating: 4, date: '2023-06-22' },
    ];

    // Function to render reviews
    function renderReviews() {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="name">${review.name}</span>
                    <div class="rating">${renderRating(review.rating)}</div>
                </div>
                <span class="date">${review.date}</span>
                <div class="message">${review.message}</div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Function to render rating stars
    function renderRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<img src="pics/star-filled.png" alt="Star">';
            } else {
                stars += '<img src="pics/star-empty.png" alt="Star">';
            }
        }
        return stars;
    }

    // Event listener for form submission
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const rating = document.getElementById('rating').value;
        const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

        if (name && email && message && rating) {
            const newReview = { name, email, message, rating: parseInt(rating), date };
            reviews.push(newReview);
            renderReviews();
            reviewForm.reset();
        } else {
            alert('All fields are required!');
        }
    });

    // Initial render of reviews
    renderReviews();
});
