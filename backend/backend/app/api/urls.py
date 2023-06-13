from django.urls import path
from . import views

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("signup/", views.signup, name="signup"),
    path("getUser/<int:id>", views.getUser, name="getUser"),
    path("userProfiles/<int:id>", views.userProfiles, name="userProfiles"),
    path("getAppUsers/<int:id>", views.getAppUsers, name="getAppUsers"),
    path("filterBy/<int:id>", views.filterBy, name="filterBy"),
    path("searchUsers/", views.searchUsers, name="searchUsers"),
    path("profileDetails/<int:id>", views.profileDetails, name="profileDetails"),
    path("addImage1/<int:id>", views.addImage1, name="addImage1"),
    path("editAbout/<int:id>", views.editAbout, name="editAbout"),
    path("editWorkEdu/<int:id>", views.editWorkEdu, name="editWorkEdu"),
    path("editZodiac/<int:id>", views.editZodiac, name="editZodiac"),
    path("userLiked/", views.userLiked, name="userLiked"),
    path("userMatches/", views.MatchView.as_view(), name="userMatches"),
    path("getMatches/<int:id>", views.MatchView.as_view(), name="getMatches"),
    path("userNotifications/<int:id>",
         views.userNotifications, name="userNotifications"),
    path("userChats/<int:id>", views.userChats, name="userChats"),
    path("getUserMessages/<int:id>", views.getUserMessages, name="getUserMessages"),

    # Admin url's
    path("admin_login", views.admin_login.as_view(), name="admin_login"),
    path("getUsers", views.getUsers, name="getUsers"),
    path("userDelete/<int:id>", views.userDelete, name="userDelete"),
    path("userBlock/<int:id>", views.userBlock, name="userBlock"),
    path("editUsers/<int:id>", views.editUsers, name="editUsers"),
    path("statistics", views.statistics, name="statistics"),
]
