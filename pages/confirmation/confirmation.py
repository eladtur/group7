from flask import Blueprint, render_template

confirmation_bp = Blueprint(
    'confirmation',
    __name__,
    static_folder='static',
    static_url_path='/pages/confirmation',
    template_folder='templates'
)

@confirmation_bp.route('/')
@confirmation_bp.route('/confirmation')
def confirmation_page():
    return render_template('confirmation.html')