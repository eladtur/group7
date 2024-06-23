document.addEventListener('DOMContentLoaded', () => {
    const userFullName = document.getElementById('user-full-name');
    const signOutLink = document.getElementById('sign-out-link');
    const profileIcon = document.querySelector('.left-icons a[href="Profile.html"]');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        userFullName.textContent = user.fullName;
        signOutLink.style.display = 'inline';
    } else {
        userFullName.textContent = '';
        signOutLink.style.display = 'none';
    }

    signOutLink.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'Login.html';
    });

    profileIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (user) {
            window.location.href = 'Profile.html';
        } else {
            window.location.href = 'Login.html';
        }
    });
});
