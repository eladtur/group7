from flask import Blueprint, render_template, Request, session, jsonify, request

cart_bp = Blueprint(
    'cart',
    __name__,
    static_folder='static',
    static_url_path='/pages/cart',
    template_folder='templates'
)


# @cart_bp.route('/insert-cart-item', methods=['POST'])
# def insert_cart_item_route():
#     from db_connector import get_customer_by_email, insert_cart_item
#     from utils import convert_objectid_to_str
#     if 'loggedInUser' in session:
#         customer = get_customer_by_email(email=session['loggedInUser'],
#                                          with_cart=True)
#         customer = convert_objectid_to_str(customer)
#         data = request.json
#         cart_id = customer["cart"]["_id"]
#         product_id = data.get('product_id')
#         quantity = data.get('quantity')
#
#         existed = insert_cart_item(cart_id, product_id, quantity)
#         if existed:
#             for item in customer["cart"]["items"]:
#                 if item["product_id"] == product_id:
#                     item["quantity"] += quantity
#         else:
#             customer["cart"]["items"].append({
#                 "product_id": product_id,
#                 "quantity": quantity
#             })
#         return jsonify(existed), 201
#     return jsonify({"message": "Customer Unauthorized"}), 401
#
@cart_bp.route('/insert-cart-item', methods=['POST'])
def insert_cart_item_route():
    from db_connector import get_customer_by_email, insert_cart_item
    from utils import convert_objectid_to_str
    if 'loggedInUser' in session:
        customer = get_customer_by_email(email=session['loggedInUser'], with_cart=True)
        customer = convert_objectid_to_str(customer)
        data = request.json
        cart_id = customer["cart"]["_id"]
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        base = data.get('base')
        cream = data.get('cream')
        dietary_preference = data.get('dietaryPreference')
        inscription = data.get('inscription')
        price = data.get('price')
        name = data.get('name')
        image = data.get('image')

        item = {
            "product_id": product_id,
            "quantity": quantity,
            "base": base,
            "cream": cream,
            "dietaryPreference": dietary_preference,
            "inscription": inscription,
            "price": price,
            "name": name,
            "image": image
        }

        existed = insert_cart_item(cart_id, item)
        if existed:
            for cart_item in customer["cart"]["items"]:
                if cart_item["product_id"] == product_id:
                    cart_item["quantity"] += quantity
        else:
            customer["cart"]["items"].append(item)

        return jsonify({"message": "Item added to cart"}), 201
    return jsonify({"message": "Customer Unauthorized"}), 401


@cart_bp.route('/delete-cart-item', methods=['POST'])
def delete_cart_item_route():
    from db_connector import get_customer_by_email, update_or_remove_cart_item
    from utils import convert_objectid_to_str
    if 'loggedInUser' in session:
        customer = get_customer_by_email(email=session['loggedInUser'],
                                         with_cart=True)
        customer = convert_objectid_to_str(customer)
        data = request.json
        cart_id = customer["cart"]["_id"]
        product_id = data.get('product_id')
        quantity = data.get('quantity')

        existed = update_or_remove_cart_item(cart_id, product_id, quantity)
        if existed:
            for item in customer["cart"]["items"]:
                if item["product_id"] == product_id:
                    if item["quantity"] > quantity:
                        item["quantity"] -= quantity
                    else:
                        customer["cart"]["items"].remove(item)
                        break
        return jsonify(existed), 201
    return jsonify({"message": "Customer Unauthorized"}), 401

@cart_bp.route('/get_user_cart', methods=['GET'])
def get_user_cart_route():
    from db_connector import get_customer_by_email, get_customer_cart

    if 'loggedInUser' in session:
        customer_email = session['loggedInUser']
        cart_items = get_customer_cart(customer_email)
        return jsonify(cart_items), 200
    return jsonify({"message": "User not logged in"}), 401




@cart_bp.route('/')
@cart_bp.route('/cart')
def cart_page():
    return render_template('cart.html')
