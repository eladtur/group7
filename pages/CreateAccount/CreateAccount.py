from flask import Flask, Blueprint, request, jsonify, session, redirect, url_for, render_template

CreateAccount_bp = Blueprint(
    'CreateAccount',
    __name__,
    static_folder='static',
    static_url_path='/pages/CreateAccount',
    template_folder='templates'
)

@CreateAccount_bp.route('/CreateAccount', methods=['POST'])
def register():
    from db_connector import get_customer_by_email,generate_password_hash,insert_customer

    data = request.json
    email = data.get('CustomerEmail')
    password = data.get('Password')
    name = data.get('Name')
    phone = data.get('Phone')
    if get_customer_by_email(email):
        return jsonify({"message": "Email already registered"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    customer = {
        "CustomerEmail": email,
        "Password": hashed_password,
        "Name": name,
        "Phone": phone,
        "CreditCard": data.get('CreditCard', {}),
        "Appointments": data.get('Appointments', []),
        "Contacts": data.get('Contacts', [])
    }
    insert_customer(customer)

    session['loggedInUser'] = email

    return jsonify({"message": "Customer registered successfully"}), 201


@CreateAccount_bp.route('/')
@CreateAccount_bp.route('/CreateAccount')
def CreateAccount_page():
    return render_template('CreateAccount.html')