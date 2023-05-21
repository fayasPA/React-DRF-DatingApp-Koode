from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.utils import timezone
import datetime
from django.dispatch import Signal
from .signals import match_created
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from app.api.consumers import ChatConsumer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import *
from app.models import *
from userprofile.models import *
from django.db.models import Q


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        """
        Used to update the token produced from jwt inorder to encode the username along with the access and refresh token.
        token: token obtained from jwt.
        currUser: used to get the logged-in user's object.
        message: message to be shown when user is blocked.
        """
        token = super().get_token(user)
        currUser = MyUser.objects.get(username=user)
        if currUser.is_active:
            # Add custom claims
            token['username'] = user.username
            return token
        else:
            message = {'msg': 'User is Blocked'}
            return Response(message)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Class used to call the custom TokenObtainPairSerializer of the jwt.
    serializer_class: object instance of MyTokenObtainPairSerializer.
    """
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        'api/token/refresh',
    ]
    return Response(routes)


@api_view(['POST'])
def signup(request):
    """
    This method is used to add a new user into the database via 'form'.
    data: used to store the data passed through form from frontend.
    createdUser: used to store the newly created user from the database.
    """
    data = request.data
    try:
        user = MyUser.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
            first_name=data['firstname'],
            last_name=data['lastname'],
            image=data['image'],
            gender=data['gender'],
            age=data['age']
        )
        createdUser = MyUser.objects.get(username=data['username'])
        UserProfile.objects.create(user_id=createdUser.id)
        serializer = MyUserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'username taken'}
        print(e)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUser(request, id):
    """
    This method is used to get the user info of the logged-in user.
    param:
        id - id of the logged-in user.

    currUser: MyUser object got from the database.
    serializer: serialized data of MyUser Object.
    """
    currUser = MyUser.objects.get(id=id)
    serializer = MyUserSerializer(currUser, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def userProfiles(request, id):
    """
    This method is used to get the user info.
    param:
        id - id of the user.

    user: MyUser object got from the database.
    serializer: serialized data of MyUser Object.
    """
    user = MyUser.objects.get(id=id)
    user_profile = UserProfile.objects.get(user=user.id)
    serializer = UserProfileDetailsSerializer(user_profile)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAppUsers(request, id):
    """
    Used to get users needed to show at the homepage of the application.
    param:
        id - id of the logged-in user.

    currUser: MyUser object of the logged-in user.
    serializer: serialized data of currUser from MyUserSerializer is stored.
    user_data: Each user data from the serialized data gotten from the database.
    user_id: getting the id of each user.
    user_profile: UserProfile object of each user is stored in this variable.
    user_profile_data: Serialized data of the user_profile data.
    user_data['user_profile']: stores user_profile in the user_data object as nested dictionary.  
    """
    appUsers = MyUser.objects.all().exclude(Q(id=id) | Q(is_superuser=True))
    serializer = MyUserSerializer(appUsers, many=True)
    for user_data in serializer.data:
        user_id = user_data['id']
        user_profile = UserProfile.objects.get(user=user_id)
        user_profile_data = UserProfileSerializer(user_profile).data
        user_data['user_profile'] = user_profile_data
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def filterBy(request, id):
    """
    This method is used to filter the users to be shown at the homepage.

    data: data passed through form from frontend.
    filteredUsers: List of users in the app filtered by the data passed from the frontend.
    """
    data = request.data
    print(data,'-----',id)
    if data['filter'] != 'All':
        filteredUsers = MyUser.objects.filter(Q(gender=data['filter']) | Q(id=id)).exclude(Q(id=id) | Q(is_superuser=True))
    else:
        filteredUsers = MyUser.objects.all().exclude(Q(id=id) | Q(is_superuser=True))
    print(filteredUsers) 
    serializer = MyUserSerializer(filteredUsers, many=True)
    for user_data in serializer.data:
        user_id = user_data['id']
        user_profile = UserProfile.objects.get(user=user_id)
        user_profile_data = UserProfileSerializer(user_profile).data
        user_data['user_profile'] = user_profile_data
    return Response(serializer.data)

@api_view(['POST'])
def searchUsers(request):
    """
    This method is used to get the users list according to the search item entered in the search bar.

    data: search item passed through post request
    searchedUsers: list of users corresponding to search item.
    searchList: Serialized data of the result.
    """
    data = request.data
    print(data['searchItem'],'---------')
    searcheddUsers = MyUser.objects.filter(username__icontains=data['searchItem']).exclude(Q(is_superuser=True)).order_by('username')
    searchList = MyUserSerializer(searcheddUsers, many=True)
    print(searcheddUsers)
    return Response(searchList.data)

@api_view(['GET'])
def profileDetails(request, id):
    """
    This method is used to get the UserProfile object to be displayed in the userprofile page in the frontend
    para:
        id - id of the logged-in user.

    currUser: UserProfile object of the logged-in user.
    serializer: serialized(Json) data of the currUser object.
    """
    currUser = UserProfile.objects.get(user_id=id)
    serializer = UserProfileSerializer(currUser, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def addImage1(request, id):
    """
    This method is used to add or edit the "images" of the logged-in user in the UserProfile Section.
    param:
        id - id of the logged-in user.

    data: data passed through form from frontend.
    currUser: UserProfile object of logged-in user.
    """
    data = request.data
    currUser = UserProfile.objects.get(user_id=id)
    try:
        if not currUser.image1:
            currUser.image1.save(data['image1'].name, data['image1'])
        elif not currUser.image2:
            currUser.image2.save(data['image1'].name, data['image1'])
        else:
            currUser.image3.save(data['image1'].name, data['image1'])
        currUser.save()
    except Exception as e:
        print(e)
    return Response()


@api_view(['POST'])
def editAbout(request, id):
    """
    This method is used to add or edit the "edit" section of the logged-in user.
    param:
        id - id of the logged-in user.

    data: data passed through form from frontend.
    currUser: UserProfile object of logged-in user.
    """
    data = request.data
    currUser = UserProfile.objects.get(user_id=id)
    currUser.about = data['about']
    currUser.save()
    return Response()


@api_view(['POST'])
def editWorkEdu(request, id):
    """
    This method is used to edit or add the work experience or Education of
    the logged-in user.
    param:
        id- id of the current logged-in user

    data: data passed through form from front end.
    currUser: UserProfile object of the logged-in user is stored in this variable.

    """
    data = request.data
    currUser = UserProfile.objects.get(user_id=id)
    currUser.education = data['education']
    currUser.job = data['job']
    currUser.save()
    return Response()


@api_view(['POST'])
def editZodiac(request, id):
    """
    Method is used to add or edit the zodiac sign of the logged-in user through a post request.
    parameter-id: id of the logged-in user.

    data: data passed through the form.
    currUser: UserProfile object of the logged-in user.
    """
    data = request.data
    currUser = UserProfile.objects.get(user_id=id)
    currUser.zodiac = data['zodiac']
    currUser.save()
    return Response()


@api_view(['POST'])
def userLiked(request):
    """
    Method is called when logged-in user likes another user, and then LikedUser object is created.
    But if there is already an object, then it is not created.

    data: gets the data which is posted through a form.
    myobject: Liked user object when created is stored in this.
    created: boolean value we get when object is created or not.
    """
    try:
        data = request.data
        my_object, created = LikedUser.objects.get_or_create(
            sender_id=data['curr_user_id'], reciever_id=data['liked_user_id'])
    except Exception as e:
        print(e, "ERROR-----")
    return Response({"created": created})


@api_view(['GET'])
def userNotifications(request, id):
    """
    This method is used to get notifications got for the logged in user.
    parameter-id: id of the current logged in user.

    notifications : used to get the notification from the database.
    """
    notifications = Notification.objects.filter(
        receiver_id=id, is_read=False).order_by('-timestamp')
    if len(notifications) == 0:
        return Response()
    serializer = NotificationSerializer(notifications, many=True)
    for notification in serializer.data:
        sender_id = notification['sender']
        user = MyUser.objects.get(id=sender_id)
        user_data = MyUserSerializer(user).data
        notification['sender'] = user_data
    return Response(serializer.data)


class MatchView(APIView):
    """
    This class's post method used to create user's who have liked 
    each others profiles to be matched and then create a chat for them and also notification signal is activated.
    likes: Gets all the likes from the database
    like: each likes in likes
    reciprocal_like: gets the like object from the model 'Like' with sender and receiver interchanged so
                    that we will know if both user's have liked each other
    existing_match1: checks whether there is already any match object in model 'Match'
    existing_match2: checks whether there is already any match object in model with interchanged sender and reciever
    existing_chat: checks whether there is already any chat object in model 'Chat'
    existing_chat2: checks whether there is already any chat object in model 'Chat' with interchanged sender and reciever
    """

    def post(self, request):
        likes = LikedUser.objects.all()
        matches = []
        for like in likes:
            reciprocal_like = LikedUser.objects.filter(
                sender=like.reciever, reciever=like.sender).first()
            if reciprocal_like:
                existing_match1 = Match.objects.filter(
                    user1=like.sender, user2=like.reciever).exists()
                existing_match2 = Match.objects.filter(
                    user1=like.reciever, user2=like.sender).exists()
                if not existing_match1 or not existing_match2:
                    match = Match(user1=like.sender, user2=like.reciever)
                    match.save()
                    existing_chat = Chat.objects.filter(
                        sender=like.sender, receiver=like.reciever).exists()
                    existing_chat2 = Chat.objects.filter(
                        sender=like.reciever, receiver=like.sender).exists()
                    if not existing_chat and not existing_chat2:
                        Chat.objects.create(
                            sender=like.sender, receiver=like.reciever)
                    matches.append(match)
        return Response({'detail': f'{len(matches)} matches created successfully.'}, status=status.HTTP_201_CREATED)

    def get(self, request, id):
        matches = []
        matches = Match.objects.filter(user1_id=id)
        print(matches)
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data) 

@api_view(['GET'])
def userChats(request, id):
    """
    Method is used to get Chat list of the current logged in user.
    parameter-id: id of the current logged in user.

    chats: used to get the chat list of the logged in user.
    serializer: Used to get the chats serialized by passing through ChatSerializer.
    """
    chats = Chat.objects.filter(Q(sender_id=id) | Q(receiver_id=id))
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserMessages(request, id):
    """
    This method is used to get the messages b/w logged in user and and another particular user.
    parameter-id: id of the particular chatList containing two users.

    messages: used to get the message list from Message table from database 
                of logged in user with another user inside chat_id.
    serializer: Used to get the messages serialized by passing through MessageSerializer.
    """
    messages = Message.objects.filter(chat_id=id).order_by('created_at')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

# ADMIN SIDE


class admin_login(APIView):

    def post(self, request):
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        serial = MyUserSerializer(user, many=False)
        if user is not None and user.is_superuser:
            return Response({"data": serial.data})
        else:
            return Response('Invalid credentials')


@api_view(['GET'])
def getUsers(request):
    user = MyUser.objects.all().exclude(is_superuser=True).order_by('username')
    serializer = MyUserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def userBlock(request, id):
    user = MyUser.objects.filter(id=id).first()
    name = user.username
    user.is_active = not user.is_active
    user.save()
    print(name, "fayas")
    return Response({'name': name})

@api_view(['POST'])
def editUsers(request, id):
    """
    This method is used to add or edit the "edit" section of the user.
    param:
        id - id of the user.

    data: data passed through form from frontend.
    currUser: UserProfile object of logged-in user.
    """
    data = request.data
    editUser = MyUser.objects.get(id=id)
    print(editUser,"-----")
    editUser.first_name = data['firstName']
    editUser.last_name = data['lastName']
    editUser.age = data['age']
    editUser.username = data['username']
    editUser.save()
    return Response()


@api_view(['DELETE'])
def userDelete(request, id):
    user = MyUser.objects.get(id=id)
    name = user.username
    user.delete()
    return Response({'name': name})

@api_view(['GET'])
def statistics(request):
    user = MyUser.objects.all().exclude(is_superuser=True)
    user_count = user.count()
    userSerializer = MyUserSerializer(user, many=True)
    chats = Chat.objects.all()
    chat_count = chats.count()
    chatSerializer = ChatSerializer(chats, many=True)
    print('statistics')
    data = {
        # 'user_data': userSerializer.data,
        # 'chat_data': chatSerializer.data,
        "user_count" : user_count,
        "chat_count" : chat_count / 2
    }
    return Response(data)
