// document.addEventListener('DOMContentLoaded', async () => {
//     const userFullName = document.getElementById('user-full-name');
//     const signOutLink = document.getElementById('sign-out-link');
//     //const profileIcon = document.querySelector('.left-icons a[href="{{ url_for('profile.profile_page') }}"]');
//     const profileIcon = document.querySelector('.left-icons a[href="#profile"]'); // Update this selector to match your HTML structure
//
//     // const user = JSON.parse(localStorage.getItem('loggedInUser'));
//
//
//
//
//     if (user) {
//         userFullName.textContent = user.fullName;
//         signOutLink.style.display = 'inline';
//     } else {
//         userFullName.textContent = '';
//         signOutLink.style.display = 'none';
//     }
//
//     signOutLink.addEventListener('click', () => {
//         localStorage.removeItem('loggedInUser');
//         window.location.href = '{{ url_for("login.login_page") }}';
//     });
//
//     profileIcon.addEventListener('click', (e) => {
//         e.preventDefault();
//         console.log("Profile clicked")
//         if (user) {
//             window.location.href = '{{ url_for("profile.profile_page") }}';
//         } else {
//             window.location.href = '{{ url_for("login.login_page") }}';
//         }
//     });
// });




document.addEventListener('DOMContentLoaded', async () => {
    const userFullName = document.getElementById('user-full-name');
    const signOutLink = document.getElementById('sign-out-link');
    const profileIcon = document.querySelector('.left-icons a[href="#profile"]'); // Update this selector to match your HTML structure

    try {
        const userResponse = await fetch('/get_user_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // This ensures cookies are sent with the request
        });

        if (userResponse.ok) {
            const user = await userResponse.json();
            console.log('User info:', user); // Log user information
            userFullName.textContent = user.Name;
            signOutLink.style.display = 'inline'; // Ensure the sign-out link is visible
        } else {
            console.log('User not logged in');
            userFullName.textContent = '';
            signOutLink.style.display = 'none';
            //window.location.href = '/Login'; // Redirect to login if not logged in
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        userFullName.textContent = '';
        signOutLink.style.display = 'none';
        window.location.href = '/Login'; // Redirect to login if not logged in
    }

    signOutLink.addEventListener('click', async () => {
        console.log('Sign-out link clicked');
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // This ensures cookies are sent with the request
            });

            if (response.ok) {
                console.log('Logged out successfully');
                window.location.href = '/Login'; // Adjust the URL for your login page
            } else {
                console.error('Error logging out:', response.statusText);
                alert('Error logging out.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('An error occurred while logging out. Please try again later.');
        }
    });

    profileIcon.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/get_user_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // This ensures cookies are sent with the request
        })
        .then(response => {
            alert("sd")
            console.log("response: ", response);
            if (response.ok) {

                window.location.href = '/Profile'; // Adjust the URL for your profile page
            } else {
                window.location.href = '/Login'; // Adjust the URL for your login page
            }
        })
        .catch(error => {
            console.error('Error checking user session:', error);
            window.location.href = '/Login'; // Adjust the URL for your login page
        });
    });
});
/*fetch('/insert-cart-item', {
        method: 'POST',
        body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // This ensures cookies are sent with the request
    })
/*
fetch('/delete-cart-item', {
        method: 'POST',
        body:JSON.stringify({"product_id": "6699147b433e8fe0227248a8", "quantity": 1}),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // This ensures cookies are sent with the request
    })
 */