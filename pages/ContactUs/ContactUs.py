from flask import Blueprint, render_template

ContactUs_bp = Blueprint(
    'ContactUs',
    __name__,
    static_folder='static',
    static_url_path='/pages/ContactUs',
    template_folder='templates'
)

@ContactUs_bp.route('/')
@ContactUs_bp.route('/ContactUs')
def ContactUs_page():
    return render_template('ContactUs.html')