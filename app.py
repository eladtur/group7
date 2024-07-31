from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_cors import CORS


app = Flask(__name__)
app.secret_key = '123'
CORS(app, support_credentials=True)  # Enable CORS for all routes



# Register blueprints
from pages.home.home import home_bp

app.register_blueprint(home_bp)

from pages.cakeDesign.cakeDesign import cakeDesign_bp

app.register_blueprint(cakeDesign_bp)

from pages.cart.cart import cart_bp

app.register_blueprint(cart_bp)

from pages.catalog.catalog import catalog_bp

app.register_blueprint(catalog_bp)

from pages.checkout.checkout import checkout_bp

app.register_blueprint(checkout_bp)

from pages.confirmation.confirmation import confirmation_bp

app.register_blueprint(confirmation_bp)

from pages.ContactUs.ContactUs import ContactUs_bp

app.register_blueprint(ContactUs_bp)

from pages.CreateAccount.CreateAccount import CreateAccount_bp

app.register_blueprint(CreateAccount_bp)

from pages.Login.Login import Login_bp

app.register_blueprint(Login_bp)

from pages.Profile.Profile import Profile_bp

app.register_blueprint(Profile_bp)

from pages.Review.Review import Review_bp

app.register_blueprint(Review_bp)

from pages.SetAppointment.SetAppointment import SetAppointment_bp

app.register_blueprint(SetAppointment_bp)



if __name__ == "__main__":
    app.run(debug=True)


