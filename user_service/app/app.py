from flask import Flask
from config import config
from routes import auth_routes
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(config['development'])


    # Register blueprints
app.register_blueprint(auth_routes)

db = SQLAlchemy(app)

# # Define the User model


# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(256), nullable=False)


if __name__ == '__main__':
    # Create all tables if they don't exist
    app.run(debug=True)