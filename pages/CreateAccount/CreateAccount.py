from flask import Blueprint, render_template

CreateAccount_bp = Blueprint(
    'CreateAccount',
    __name__,
    static_folder='static',
    static_url_path='/pages/CreateAccount',
    template_folder='templates'
)

@CreateAccount_bp.route('/')
@CreateAccount_bp.route('/CreateAccount')
def CreateAccount_page():
    return render_template('CreateAccount.html')