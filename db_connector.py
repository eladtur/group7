import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash

uri = os.environ.get('DB_URI')

cluster = MongoClient(uri, server_api=ServerApi('1'))

mydatabase = cluster['S&E_db']
customers_col = mydatabase['Customers Collection']
cakes_col = mydatabase['Cakes Collection']
orders_col = mydatabase['Orders Collection']
reviews_col = mydatabase['Reviews Collection']

carts_col = mydatabase['Carts Collection']
cart_items_col = mydatabase['Cart Items Collection']
credit_cards_col = mydatabase['CreditCards']
appointments_col = mydatabase['Appointments']
contacts_col = mydatabase['Contacts']
cake_in_order_col = mydatabase['CakeInOrder']
cake_bases_col = mydatabase['CakeBases']
creams_col = mydatabase['Creams']
dietary_preferences_col = mydatabase['DietaryPreferences']
#
print(mydatabase.list_collection_names())

def get_list_of_customers():
    return list(customers_col.find())



def insert_customer(customer_dict):
    result = customers_col.insert_one(customer_dict)
    print(result)
    cart_result = insert_new_cart(result.inserted_id)
    query = {"_id": result.inserted_id}

    # Define the new values for the document
    new_values = {"$set": {"cart": cart_result.inserted_id}}

    # Update the document
    result = customers_col.update_one(query, new_values, upsert=True)
    return result

def insert_order(order_dict):
    result = orders_col.insert_one(order_dict)
    print(result)
    return result

def get_customer(email):
    customer = customers_col.find_one({"CustomerEmail": email})
    return customer


def insert_new_cart(customer_id):
    cart = {
        "items": [],
        "customer": customer_id
    }
    result = carts_col.insert_one(cart)
    return result


def insert_cart_item(cart_id, item):
    from bson import ObjectId
    if not isinstance(cart_id, ObjectId):
        cart_id = ObjectId(cart_id)
    if not isinstance(item['product_id'], ObjectId):
        item['product_id'] = ObjectId(item['product_id'])

    result = carts_col.update_one(
        {"_id": cart_id, "items.product_id": item['product_id']},
        {"$inc": {"items.$.quantity": item['quantity']}}
    )

    if result.matched_count == 0:
        carts_col.update_one(
            {"_id": cart_id},
            {"$push": {"items": item}}
        )
        return False  # Item didn't exist and we created a new cart item
    return True  # Item exists and we added quantity


def update_or_remove_cart_item(cart_id, product_id, quantity):
    from bson import ObjectId
    cart_id = ObjectId(cart_id)
    product_id = ObjectId(product_id)

    result = carts_col.aggregate([
        {"$match": {"_id": cart_id}},
        {"$unwind": "$items"},
        {"$match": {"items.product_id": product_id}},
        {"$project": {"items.quantity": 1, "_id": 0}}
    ])

    existing_item = next(result, None)

    if existing_item:
        current_quantity = existing_item["items"]["quantity"]
        new_quantity = current_quantity - quantity

        if new_quantity > 0:
            carts_col.update_one(
                {"_id": cart_id, "items.product_id": product_id},
                {"$inc": {"items.$.quantity": -quantity}},
            )
            print(f"Decremented product {product_id} quantity in cart {cart_id} by {quantity}")
        else:
            carts_col.update_one(
                {"_id": cart_id},
                {"$pull": {"items": {"product_id": product_id}}}
            )
            print(f"Removed product {product_id} from cart {cart_id} as quantity reached zero")
        return True
    else:
        print(f"Product {product_id} not found in cart {cart_id}")
        return False

def get_customer_by_email(email, with_cart=False):
    if with_cart:
        result = customers_col.aggregate(
            [
                {"$match": {"CustomerEmail": email}},
                {"$lookup":
                    {
                        "from": "Carts Collection",
                        "localField": "cart",  # Works with an array
                        "foreignField": "_id",
                        "as": "cart"
                    }
                }
            ]).next()
        if "cart" in result and len(result["cart"]) > 0:
            result["cart"] = result["cart"][0]
        return result

    customer = customers_col.find_one({"CustomerEmail": email})
    return customer




def clear_customer_cart(customer_email):
    from bson import ObjectId
    customer = customers_col.find_one({"CustomerEmail": customer_email})
    if customer and 'cart' in customer:
        cart_id = customer['cart']
        carts_col.update_one(
            {"_id": ObjectId(cart_id)},
            {"$set": {"items": []}}
        )
        return True
    return False

def get_customer_cart(customer_email):
    from bson import ObjectId
    customer = customers_col.find_one({"CustomerEmail": customer_email})
    if customer and 'cart' in customer:
        cart_id = customer['cart']
        cart = carts_col.find_one({"_id": ObjectId(cart_id)})
        return cart
    return None

def get_cake_from_catalog(cakeID):
    from bson import ObjectId
    cake = cakes_col.find_one({"cakeID": cakeID})
    return cake

def insert_order(order):
    from bson import ObjectId
    orders_col = mydatabase['Orders Collection']
    result = orders_col.insert_one(order)
    return result