from flask import Blueprint, render_template

Login_bp = Blueprint(
    'Login',
    __name__,
    static_folder='static',
    static_url_path='/pages/Login',
    template_folder='templates'
)

@Login_bp.route('/')
@Login_bp.route('/Login')
def Login_page():
    return render_template('Login.html')