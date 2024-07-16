document.addEventListener('DOMContentLoaded', () => {
    const userFullName = document.getElementById('user-full-name');
    const signOutLink = document.getElementById('sign-out-link');
    const profileIcon = document.querySelector('.left-icons a[href="{{ url_for('profile.profile_page') }}"]');
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
        window.location.href = '{{ url_for("login.login_page") }}';
    });

    profileIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (user) {
            window.location.href = '{{ url_for("profile.profile_page") }}';
        } else {
            window.location.href = '{{ url_for("login.login_page") }}';
        }
    });
});
