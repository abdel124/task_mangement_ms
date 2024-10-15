from flask import Flask
import Config
from .routes import auth_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config['development'])
    
    # Register blueprints
    app.register_blueprint(auth_routes)

    return app