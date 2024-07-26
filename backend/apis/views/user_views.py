from django.shortcuts import render
import json

from ..serializers import UserSerializer, ProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

# Create your views here.
@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username = request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(instance = user)
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, "user":serializer.data}, 
                    status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username =request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, "user":serializer.data}, 
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({"detail": "Successfully logged out."}, 
                    status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request): 
    return Response({'passed for username {}'.format(request.user.username)})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user 
    profile = profile.objects.get(user=user)
    try: 
        profile.name = request.data['name']
        profile.bio = request.data['bio']
        profile.profile_img = request.data['profile_img']
        profile.save()
        return Response({"detail": "Profile updated."}, 
                        status=status.HTTP_200_OK)
    except: 
        return Response({"detail": "Profile not updated."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    



