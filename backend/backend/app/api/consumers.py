from channels.generic.websocket import WebsocketConsumer
import json
from urllib.parse import urlparse
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        # self.user_inbox = None
        self.room_name = None
        self.chat_id = None
        self.user = None

    def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_name = f'inbox_{self.chat_id}'
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
        print(text_data_json['chat_id']) 
        Message.objects.create(chat_id=text_data_json['chat_id'], sender_id=text_data_json['sender_id'],content=text_data_json['content'])
        # message = text_data_json['message'] 
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_name, {"type": "chat_message", "message": 'hastalavista'}
        )

    def chat_message(self, event):
        message = event['message']
        # send msg to group
        self.send(text_data=json.dumps({'message':message}))