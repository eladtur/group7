from flask import Blueprint, render_template

cart_bp = Blueprint(
    'cart',
    __name__,
    static_folder='static',
    static_url_path='/pages/cart',
    template_folder='templates'
)

@cart_bp.route('/')
@cart_bp.route('/cart')
def cart_page():
    return render_template('cart.html')