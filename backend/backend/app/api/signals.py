from django.db.models.signals import post_save
from django.dispatch import receiver
from userprofile.models import *
from app.models import MyUser
from django.dispatch import Signal

match_created = Signal()


@receiver(post_save, sender=Match)
def send_match_notification(sender, instance, created, **kwargs):
    if created:
        print('working')
        # If a new Match object is created, send notification to both users
        user1 = instance.user1
        user2 = instance.user2
        notification = Notification(
            sender=user1, receiver=user2, message=f'You have been matched with {user1.username}')
        notification.save()
