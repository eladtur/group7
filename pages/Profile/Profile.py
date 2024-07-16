from flask import Blueprint, render_template

Profile_bp = Blueprint(
    'Profile',
    __name__,
    static_folder='static',
    static_url_path='/pages/Profile',
    template_folder='templates'
)

@Profile_bp.route('/')
@Profile_bp.route('/Profile')
def Profile_page():
    return render_template('Profile.html')