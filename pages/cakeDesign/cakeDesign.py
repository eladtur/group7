from flask import Blueprint, render_template

cakeDesign_bp = Blueprint(
    'cakeDesign',
    __name__,
    static_folder='static',
    static_url_path='/pages/cakeDesign',
    template_folder='templates'
)

@cakeDesign_bp.route('/')
@cakeDesign_bp.route('/cakeDesign')
def cakeDesign_page():
    return render_template('cakeDesign.html')