# from flask import Blueprint, render_template
#
# home_bp = Blueprint(
#     'home',
#     __name__,
#     static_folder='static',
#     template_folder='templates',
#     static_url_path='/home'
# )
#
# @home_bp.route('/')
#
# @home_bp.route('/home')
# def index():
#     return render_template('home.html')


from flask import Blueprint, render_template

home_bp = Blueprint(
    'home',
    __name__,
    static_folder='static',
    template_folder='templates'
)

@home_bp.route('/')
@home_bp.route('/home')
def index():
    return render_template('home.html')
