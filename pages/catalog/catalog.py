from flask import Blueprint, render_template

catalog_bp = Blueprint(
    'catalog',
    __name__,
    static_folder='static',
    static_url_path='/pages/catalog',
    template_folder='templates'
)

@catalog_bp.route('/')
@catalog_bp.route('/catalog')
def catalog_page():
    return render_template('catalog.html')