from pathlib import Path
import dj_database_url
import os
ROOT_URLCONF = 'authproject.urls'

# from dotenv import load_dotenv

# load_dotenv()  # optional but good for future

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-+r0w!n-*&+)@(-btx^z5bag^$^pj&vw*9^8cw-rqhuvn^vst++'

DEBUG = True  # ❗️ Set to False in production

ALLOWED_HOSTS = ['*']  # ✅ For Render, this is fine for now

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Your apps
    'accounts',

    # Third-party apps
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Move it up, recommended
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database
DATABASES = {
    'default': dj_database_url.parse('postgresql://life_sync_user:9zMNMoIqbYeiUsoIi1BprwKoY1SejJW4@dpg-cvslvkvdiees73fja1u0-a.oregon-postgres.render.com/life_sync')
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # You can add your templates directory here later
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

STATIC_ROOT = BASE_DIR / 'staticfiles'  # ✅ Important for Render deploy

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOW_ALL_ORIGINS = True  # ✅ For testing, allow all. Restrict in production.
