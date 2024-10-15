import os
from dotenv import load_dotenv

# Load environment variables from a .env file (if you're using it)
load_dotenv()

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_default_secret_key')
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    DB_USERNAME = os.environ.get('DB_USERNAME', 'default_username')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', 'default_password')
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_PORT = os.environ.get('DB_PORT', '5432')
    DB_NAME = os.environ.get('DB_NAME', 'your_db_name')
    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

class ProductionConfig(Config):
    """Production configuration."""
    DB_USERNAME = os.environ.get('DB_USERNAME')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_HOST = os.environ.get('DB_HOST')
    DB_PORT = os.environ.get('DB_PORT')
    DB_NAME = os.environ.get('DB_NAME')
    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DB_USERNAME = os.environ.get('TEST_DB_USERNAME', 'test_username')
    DB_PASSWORD = os.environ.get('TEST_DB_PASSWORD', 'test_password')
    DB_HOST = os.environ.get('TEST_DB_HOST', 'localhost')
    DB_PORT = os.environ.get('TEST_DB_PORT', '5432')
    DB_NAME = os.environ.get('TEST_DB_NAME', 'test_db_name')
    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

# Dictionary to hold configuration based on environment
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}

# You can set your default configuration here
DEFAULT_CONFIG = config[os.getenv('FLASK_ENV', 'development')]
