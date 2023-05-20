from django.db import models
from app.models import *
import datetime
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from app.api.consumers import ChatConsumer

class UserProfile(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    about = models.CharField(max_length=300)
    zodiac = models.CharField(max_length=20)
    education = models.CharField(max_length=100)
    job = models.CharField(max_length=100)
    image1 = models.ImageField(null=True, blank=True, upload_to="")
    image2 = models.ImageField(null=True, blank=True, upload_to="")
    image3 = models.ImageField(null=True, blank=True, upload_to="")

# class LikedUsers(models.Model):
#     user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
#     liked_user_id = models.IntegerField(blank=True,null=True)
#     liked_date =models.DateTimeField(blank=True,null=True)
#     is_matched = models.BooleanField(default=False)
#     not_matched = models.BooleanField(default=False)
#     result_date =models.DateTimeField(blank=True,null=True)
    
class LikedUser(models.Model):
    sender = models.ForeignKey(MyUser, related_name='liked_by_users', on_delete=models.CASCADE)
    reciever = models.ForeignKey(MyUser, related_name='liked_users', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = 'like'  # Set the notification type for likes

    def save(self, *args, **kwargs):
        # Create a new notification with the appropriate type when a like is added
        notification = Notification(sender=self.sender, receiver=self.reciever, message=f'{self.sender.username} has shown an interest in you')
        notification.save()
        # Send a real-time notification to the receiver using Django Channels
        # channel_layer = get_channel_layer()
        # print('channel entered-----------')
        # async_to_sync(channel_layer.group_send)( 
        #     f'user_{self.reciever.id}',
        #     {
        #         'type': 'notification',
        #         'message': 'You have a new notification!',
        #     }
        # )

        super(LikedUser, self).save(*args, **kwargs)

class Notification(models.Model):
    sender = models.ForeignKey(MyUser, related_name='sent_notifications', on_delete=models.CASCADE)
    receiver = models.ForeignKey(MyUser, related_name='received_notifications', on_delete=models.CASCADE)
    message = models.CharField(max_length=300,blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Match(models.Model):
    user1 = models.ForeignKey(MyUser, related_name='matches1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(MyUser, related_name='matches2', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = 'match'  # Set the notification type for likes
    

class Chat(models.Model):
    sender = models.ForeignKey(MyUser, related_name='sent_chats', on_delete=models.CASCADE)
    receiver = models.ForeignKey(MyUser, related_name='received_chats', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(MyUser, related_name='sent_messages', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # is_read = models.BooleanField(default=False)

        # Send a real-time notification to the receiver using Django Channels
    # def save(self, *args, **kwargs):
        # channel_layer = get_channel_layer()
        # print('channel entered-----------')
        # async_to_sync(channel_layer.group_send)( 
        #     f'user_{self.chat_id}',
        #     {
        #         'type': 'chat',
        #         'message': 'You have a new msg!',
        #     }
        # )
        # super(Message, self).save(*args, **kwargs)
