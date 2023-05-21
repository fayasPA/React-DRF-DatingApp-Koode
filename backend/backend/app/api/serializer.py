from rest_framework import serializers
from app.models import *
from userprofile.models import *

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserProfileDetailsSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    class Meta:
        model = UserProfile
        fields = '__all__'


class LikedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedUser
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    user2 = MyUserSerializer()
    class Meta:
        model = Match
        fields = '__all__'
class ChatSerializer(serializers.ModelSerializer):
    sender = MyUserSerializer()
    receiver = MyUserSerializer()
    
    class Meta:
        model = Chat
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'
