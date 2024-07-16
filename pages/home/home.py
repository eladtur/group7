from flask import Blueprint, render_template

home_bp = Blueprint(
    'home',
    __name__,
    static_folder='static',
    static_url_path='/pages/home',
    template_folder='templates'
)

@home_bp.route('/')
@home_bp.route('/home')
def home_page():
    return render_template('home.html')
