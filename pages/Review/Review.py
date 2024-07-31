from flask import Blueprint, render_template, Request, session, jsonify, request
import datetime

Review_bp = Blueprint(
    'Review',
    __name__,
    static_folder='static',
    static_url_path='/pages/Review',
    template_folder='templates'
)

@Review_bp.route('/Review', methods=['GET'])
def get_reviews():
    from db_connector import get_customer_by_email, insert_cart_item
    reviews = list(reviews_col.find())
    for review in reviews:
        review['_id'] = str(review['_id'])
    return jsonify(reviews), 200

@Review_bp.route('/Reviews', methods=['POST'])
def add_review():
    if 'loggedInUser' in session:
        data = request.json
        review = {
            "CustomerEmail": data['CustomerEmail'],
            "Name": data['Name'],
            "ReviewText": data['ReviewText'],
            "Stars": data['Stars'],
            "Date": datetime.datetime.utcnow()
        }
        result = reviews_col.insert_one(review)
        return jsonify({"message": "Review added successfully", "id": str(result.inserted_id)}), 201
    return jsonify({"message": "User not logged in"}), 401


@Review_bp.route('/')
@Review_bp.route('/Review')
def Review_page():
    return render_template('Review.html')

