from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('room/', views.room, name='room'),
    path('get_token/', views.getToken, name='getToken'),
    path('create_member/', views.createMember, name='createUser'),
    path('get_member/', views.getMember, name='getUser'),
    path('delete_member/', views.deleteMember),
]