from flask import Blueprint, render_template

Review_bp = Blueprint(
    'Review',
    __name__,
    static_folder='static',
    static_url_path='/pages/Review',
    template_folder='templates'
)

@Review_bp.route('/')
@Review_bp.route('/Review')
def Review_page():
    return render_template('Review.html')