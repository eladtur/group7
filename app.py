# import json
# from pprint import pprint
# from flask import Flask, redirect, url_for
# from flask import render_template
# from flask import request, session
# from pages.home.home import home_bp
#
#
# app = Flask(__name__)
# app.secret_key = '123'
#
# ## home
# app.register_blueprint(home_bp, url_prefix='/home')
# if __name__ == '__main__':
#     app.run(debug=True)
#


from flask import Flask
from pages.home.home import home_bp

app = Flask(__name__)
app.secret_key = '123'

# Register the Blueprint
app.register_blueprint(home_bp, url_prefix='/home')

if __name__ == '__main__':
    app.run(debug=True)
