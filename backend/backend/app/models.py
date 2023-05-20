from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    """
    Model is used to create the user's in the app, and it makes use of django's default auth user
    by using AbstractUser.
    phone_number : user's ph.no
    image : user's profile picture
    age : user's age
    gender : user's gender
    interested_in : other gender user is interested in
    """
    phone_number = models.CharField(max_length=200, unique=False)
    image = models.ImageField(null=True, blank=True, upload_to="")
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=25, null=True)
    interested_in = models.CharField(max_length=50, null=True)
    def __str__(self):
        return self.username
    