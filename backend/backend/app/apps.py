from django.apps import AppConfig

class AppConfig(AppConfig):
    """
    AppConfig class for the `app` app.

    `name` attribute: The human-readable name of the app.
    `default_auto_field`: The default primary key field for models in the app.

    This class is used to configure the app and provide metadata about it.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
