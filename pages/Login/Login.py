from flask import Flask, Blueprint, request, jsonify, session, redirect, url_for, render_template
from werkzeug.security import generate_password_hash, check_password_hash

Login_bp = Blueprint(
    'Login',
    __name__,
    static_folder='static',
    static_url_path='/pages/Login',
    template_folder='templates'
)

@Login_bp.route('/login_action', methods=['POST'])
def login_action():
    from db_connector import get_customer

    data = request.json
    email = data.get('CustomerEmail')
    password = data.get('Password')

    print(f"Attempting to log in user with email: {email}")

    customer = get_customer(email)

    if customer:
        print(f"Customer found: {customer}")
        if check_password_hash(customer['Password'], password):
            session['CustomerEmail'] = email
            session['loggedInUser'] = email
            session['Name'] = customer['Name']  # Optionally store other info
            print(f"User {email} logged in successfully")  # Debug print
            return jsonify({"message": "Login successful", "user": {
                "CustomerEmail": customer["CustomerEmail"],
                "Name": customer["Name"],
                "Phone": customer["Phone"]
            }}), 200
        else:
            print("Password does not match")
            return jsonify({"message": "Invalid email or password"}), 401
    else:
        print("Customer not found")
        return jsonify({"message": "Invalid email or password"}), 401



# Get user orders
@Login_bp.route('/get_user_orders', methods=['GET'])
def get_user_orders():
    from db_connector import orders_col
    if 'CustomerEmail' in session:
        orders = list(orders_col.find({"CustomerEmail": session['CustomerEmail']}))
        for order in orders:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string for JSON serialization
        return jsonify(orders), 200
    return jsonify({"message": "User not logged in"}), 401

# User logout
@Login_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('loggedInUser', None)
    return jsonify({"message": "Logged out successfully"}), 200


@Login_bp.route('/get_user_info', methods=['GET'])
def get_user_info():
    from db_connector import get_customer_by_email
    import utils
    if 'loggedInUser' in session:
        customer = get_customer_by_email(email=session['loggedInUser'],
                                         with_cart=True)
        customer = utils.convert_objectid_to_str(customer)
        if customer:
            return jsonify(customer), 200


    return jsonify({"message": "User not logged in"}), 401



@Login_bp.route('/')
@Login_bp.route('/Login')
def Login_page():
    return render_template('Login.html')