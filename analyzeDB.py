import os
from pymongo import MongoClient
from bson.json_util import dumps

def analyze_db():
    uri = os.environ.get('DB_URI')

    cluster = MongoClient(uri)
    mydatabase = cluster['S&E_db']

    collections = [
        'Customers Collection',
        'Cakes Collection',
        'Orders Collection',
        'Reviews Collection',
        'Carts Collection',
        'Cart Items Collection',
        'CREDIT CARD Collection',
        'Appointments Collection',
        'Contact Collection',
        'Cake in order Collection',
        'CakeBase Collection',
        'Cream Collection',
        'DietaryPreference Collection',
        'CC-Type Collection'
    ]

    for collection_name in collections:
        collection = mydatabase[collection_name]
        print(f"Collection: {collection_name}")
        documents = collection.find()
        for document in documents:
            print(dumps(document, indent=4))

if __name__ == "__main__":
    analyze_db()
