
from django.urls import re_path
from .consumers import ChatConsumer, NotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/notification/(?P<user_id>[^/]+)/$', NotificationConsumer.as_asgi()),
]