from flask import Blueprint, render_template,session,request, jsonify

cakeDesign_bp = Blueprint(
    'cakeDesign',
    __name__,
    static_folder='static',
    static_url_path='/pages/cakeDesign',
    template_folder='templates'
)

@cakeDesign_bp.route('/get_cakes', methods=['GET'])
def get_cakes():
    from db_connector import cakes_col
    try:
        cakes = list(cakes_col.find({}, {"_id": 0}))  # Exclude the MongoDB '_id' field if not needed
        return jsonify(cakes), 200
    except Exception as e:
        print(f"Error retrieving cakes: {e}")
        return jsonify({"message": "Error retrieving cakes"}), 500
@cakeDesign_bp.route('/get_cart_item', methods=['GET'])
def get_cart_item_route():
    from db_connector import get_customer_by_email

    if 'loggedInUser' in session:
        customer_email = session['loggedInUser']
        print(f"Fetching cart for user: {customer_email}")

        try:
            customer = get_customer_by_email(email=customer_email, with_cart=True)
            print(f"Customer fetched: {customer}")

            if customer and 'cart' in customer:
                cart = customer['cart']
                print(f"Cart details: {cart}")
                return jsonify(cart), 200
            else:
                print("Cart not found or user has no cart.")
                return jsonify({"message": "Cart not found or user has no cart"}), 404
        except Exception as e:
            print(f"Error fetching cart: {str(e)}")
            return jsonify({"message": "Internal server error"}), 500

    print("User not logged in.")
    return jsonify({"message": "User not logged in"}), 401



@cakeDesign_bp.route('/')
@cakeDesign_bp.route('/cakeDesign')
def cakeDesign_page():
    return render_template('cakeDesign.html')