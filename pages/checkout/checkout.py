from flask import Blueprint, render_template,session,request, jsonify

checkout_bp = Blueprint(
    'checkout',
    __name__,
    static_folder='static',
    static_url_path='/pages/checkout',
    template_folder='templates'
)




@checkout_bp.route('/insert_order', methods=['POST'])
def insert_order():
    data = request.json
    orderId = data.get('orderId')
    orderDate = data.get('orderDate')
    city = data.get('city')
    houseNumber = data.get('houseNumber')
    streetName = data.get('streetName')
    zipCode = data.get('zipCode')
    ccType = data.get('ccType')
    ccNumber = data.get('ccNumber')
    ccExpiration = data.get('ccExpiration')
    ccCVC = data.get('ccCVC')
    customerEmail = data.get('customerEmail')
    CakeID = data.get('CakeID')
    CakeBase = data.get('CakeBase')
    Cream = data.get('Cream')
    DietaryPreference = data.get('DietaryPreference')
    Quantity = data.get('Quantity')





    order = {
        "Address": {
            "City": city,
            "HouseNumber": houseNumber ,
            "StreetName": streetName,
            "ZipCode": zipCode
        },

        "CustomerEmail": customerEmail,
        "CakesInOrder": [{
            "CakeID": CakeID,
            "CakeBase": CakeBase,
            "Cream": Cream,
            "DietaryPreference": DietaryPreference,
            "Quantity": Quantity
    }]

}

    insert_order(order)
    return jsonify({"message": "Order saved successfully"}), 201

@checkout_bp.route('/insert_order', methods=['POST'])
def insert_order_route():
    from db_connector import get_customer_by_email, insert_order,get_customer_cart,clear_customer_cart
    if 'loggedInUser' in session:
        data = request.json
        customer_email = session['loggedInUser']
        customer_cart = get_customer_cart(customer_email)
        customer = get_customer_by_email(email=customer_email, with_cart=True)
        #if customer and 'cart' in customer:
        if customer_cart and 'items' in customer_cart and customer_cart['items']:
            order = {
                "OrderID": data['orderId'],
                "OrderDate": data['orderDate'],
                "CustomerEmail": customer_email,
                "Address": {
                    "City": data['city'],
                    "HouseNumber": data['houseNumber'],
                    "StreetName": data['streetName'],
                    "ZipCode": data['zipCode']
                },
                "CreditCard": {
                    "CCType": data['ccType'],
                    "CCNumber": data['ccNumber'],
                    "CCExpiration": data['ccExpiration'],
                    "CCCVC": data['ccCVC']
                },
                "CakesInOrder": [
                    {
                        "CakeID": item['product_id'],
                        "CakeBase": item['base'],
                        "Cream": item['cream'],
                        "DietaryPreference": item['dietaryPreference'],
                        "Quantity": item['quantity'],
                        "Price": item['price']
                    }
                    for item in customer['cart']['items']
                ],
                "TotalPrice": sum(item['quantity'] * item['price'] for item in customer['cart']['items'])
            }
            insert_order(order)

            # Clear the customer's cart after order is placed
            clear_customer_cart(customer_email)



            return jsonify({"message": "Order saved successfully"}), 201
        else:
            return jsonify({"message": "Cart is empty"}), 400
    else:
        return jsonify({"message": "User not logged in"}), 401



#
# @app.route('/insert_order', methods=['POST'])
# def insert_order_route():
#     data = request.json
#     email = data.get('CustomerEmail')
#     orderId = data.get('orderId')
#     orderDate = data.get('orderDate')
#     city = data.get('city')
#     houseNumber = data.get('houseNumber')
#     streetName = data.get('streetName')
#     zipCode = data.get('zipCode')
#     ccType = data.get('ccType')
#     ccNumber = data.get('ccNumber')
#     ccExpiration = data.get('ccExpiration')
#     ccCVC = data.get('ccCVC')
#     customerEmail = data.get('customerEmail')
#     CakeID = data.get('CakeID')
#     CakeBase = data.get('CakeBase')
#     Cream = data.get('Cream')
#     DietaryPreference = data.get('DietaryPreference')
#     Quantity = data.get('Quantity')
#
#     order = {
#         "OrderID": orderId,
#         "OrderDate": orderDate,
#         "CustomerEmail": customerEmail,
#         "Address": {
#             "City": city,
#             "HouseNumber": houseNumber,
#             "StreetName": streetName,
#             "ZipCode": zipCode
#         },
#         "CreditCard": {
#             "CCType": ccType,
#             "CCNumber": ccNumber,
#             "CCExpiration": ccExpiration,
#             "CCCVC": ccCVC
#         },
#         "CakesInOrder": [
#             {
#                 "CakeID": CakeID,
#                 "CakeBase": CakeBase,
#                 "Cream": Cream,
#                 "DietaryPreference": DietaryPreference,
#                 "Quantity": Quantity,
#                 "Price": '100'
#             }
#         ],
#
#     }
#     insert_order(order)
#     session['loggedInUser'] = email
#     return jsonify({"message": "Customer registered successfully"}), 201















@checkout_bp.route('/checkout')
def checkout_page():
    return render_template('checkout.html')
