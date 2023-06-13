from channels.generic.websocket import WebsocketConsumer
import json
from urllib.parse import urlparse
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    """
    This is a Consumer class used for connecting to chat websocket and
    creating channel layer for chat between users.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.chat_id = None

    def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_name = f'room_{self.chat_id}'
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name,
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        from userprofile.models import Message
        text_data_json = json.loads(text_data)
        Message.objects.create(
            chat_id=text_data_json['chat_id'], sender_id=text_data_json['sender_id'], content=text_data_json['content'])
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_name, {"type": "chat_message", "message": 'hastalavista'}
        )

    def chat_message(self, event):
        message = event['message']
        # send msg to group
        self.send(text_data=json.dumps({'message': message}))


class NotificationConsumer(WebsocketConsumer):
    """
    This is a Consumer class used for connecting to Notification websocket and
    creating channel layer for notification updates of users.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user_id = None
        self.not_room = None

    def connect(self):
        from userprofile.models import Notification
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.not_room = f'notification{self.user_id}'
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.not_room,
            self.channel_name,
        )
        unread_notifications = Notification.objects.filter(
            receiver_id=self.user_id, is_read=False).count()
        async_to_sync(self.channel_layer.group_send)(
            self.not_room, {"type": "notification_message",
                            "message": unread_notifications}
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.not_room,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        from userprofile.models import Notification
        text_data_json = json.loads(text_data)
        liked_user = text_data_json['body']['liked_user_id']
        unread_notifications = Notification.objects.filter(
            receiver_id=liked_user, is_read=False).count()
        # Send message to room group
        sendTo = f'notification{liked_user}'
        async_to_sync(self.channel_layer.group_send)(
            sendTo, {"type": "notification_message",
                     "message": unread_notifications}
        )

    def notification_message(self, event):
        message = event['message']
        # send msg to group
        self.send(text_data=json.dumps({'message': message}))
