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

class LikedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedUser
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# class ImageSerializer(serializers.Serializer):
#     model1_data = MyUserSerializer(source='*', read_only=True)
#     model2_data = UserProfileSerializer(source='*', read_only=True)

#     def to_representation(self, instance):
#         model1_data = MyUser.objects.filter(id=self.id).only('image') # Replace with your queryset or logic to fetch data from Model1
#         model2_data = UserProfile.objects.filter(user_id=self.id).only('image1', 'image2', 'image3') # Replace with your queryset or logic to fetch data from Model2

#         serialized_model1_data = Model1Serializer(model1_data, many=True).data
#         serialized_model2_data = Model2Serializer(model2_data, many=True).data

#         return {
#             'model1_data': serialized_model1_data,
#             'model2_data': serialized_model2_data
#         }

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
    # def get_sender(self, obj):
    #     myUser = MyUser.objects.get(user=obj.sender)
    #     return {
    #         'id': obj.sender.id,
    #         'username': obj.sender.username,
    #         'email': obj.sender.email,
    #         'image': obj.sender.image
    #     }

class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'
