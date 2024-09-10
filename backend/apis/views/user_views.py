from django.shortcuts import render
import json

from ..serializers import UserSerializer, ProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from ..models import Profile

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

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

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def edit_profile(request): 
    user = request.user 
    profile = Profile.objects.get(user=user)
    
    # Handle both JSON and form data
    data = request.data

    if 'username' in data:
        user.username = data['username']
        user.save()
    
    if 'bio' in data:
        profile.bio = data['bio']
    
    if 'email' in data:
        profile.email = data['email']
    
    if 'profile_img' in request.FILES:
        profile.profile_img = request.FILES['profile_img']
    
    profile.save()
    
    serializer = ProfileSerializer(instance=profile)
    return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_profile(request): 
    user = request.user
    profile = Profile.objects.filter(user=user)[0]
    serializer = ProfileSerializer(instance = profile)
    response_data = serializer.data
    response_data['username'] = user.username
    return Response(response_data, 
                    status=status.HTTP_200_OK)




    



