from flask import Blueprint, render_template

checkout_bp = Blueprint(
    'checkout',
    __name__,
    static_folder='static',
    static_url_path='/pages/checkout',
    template_folder='templates'
)

@checkout_bp.route('/checkout')
def checkout_page():
    return render_template('checkout.html')
