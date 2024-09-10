from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile, Item, OutBid

class UserSerializer(serializers.ModelSerializer):
    class Meta(object): 
        model = User
        fields = ['username', 'password']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Profile
        fields = ['user', 'name', 'email', 'bio', 'follows', 'profile_img'] 

class ItemSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Item
        fields = ['owner', 'name', 'description', 'image', 'starting_price', 'current_bidder', 'is_sold', 'is_transferred']
class OutBidSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = OutBid
        fields = ['user', 'item', 'bidder', 'bid']
        