from ..models import Item, Profile, OutBid
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import ItemSerializer
from rest_framework import status
from django.contrib.auth.models import User
import json

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from django.db import IntegrityError



@api_view(['GET'])
def get_items_by_category(request, category):
    if category == "all":
        items = Item.objects.all() 
        serializer = ItemSerializer(instance = items, many=True)
        return Response(serializer.data, 
                        status=status.HTTP_200_OK)

    items = Item.objects.filter(category=category)
    serializer = ItemSerializer(instance = items, many=True)
    if serializer.isValid():
        return Response(serializer.data, 
                        status=status.HTTP_200_OK)
    return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_items_by_owner(request):
    data = json.loads(request.body)

    item_username = data.get('username')
    
    item_user = User.objects.filter(username=item_username)
    if not item_user:
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    owner = Profile.objects.filter(user__in=item_user)
    items = Item.objects.filter(owner__in=owner)
    serializer = ItemSerializer(instance = items, many=True)
    return Response(serializer.data, 
                    status=status.HTTP_200_OK)
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_items_by_bidder(request):
    bidder = request.user
    profile = Profile.objects.filter(user=bidder)
    items = Item.objects.filter(current_bidder=profile)
    serializer = ItemSerializer(instance = items, many=True)
    return Response(serializer.data,
                    status=status.HTTP_200_OK) 

 


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_item(request):
    user_profile = request.user 
    owner = Profile.objects.filter(user = user_profile)[0]
    
    data = json.loads(request.body)
    item_name = data.get('name', "")
    item_description = data.get('description', "")
    item_image = data.get('image', None)
    item_starting_price = data.get('starting_price', 0.0)

    try:
        item = Item(owner=owner, name=item_name, description=item_description, starting_price=item_starting_price)
        item.save() 
        serializer = ItemSerializer(instance = item, many=False)
        return Response(serializer.data, 
                        status=status.HTTP_200_OK)
    except IntegrityError:
        return Response({"detail": "Item already exists."}, 
                        status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def bid_on_item(request):
    user = request.user 
    bidder = Profile.objects.filter(user__in = user) 
    
    data = json.loads(request.body)
    item_id = data.get('item_id')
    bid_amount = data.get('bid_amount')
    item = Item.objects.filter(id=item_id)
    if not item:
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    if item.starting_price >= bid_amount:
        return Response({"detail": "Bid amount too low."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # notify old current bidder that they have been outbid
    old_bidder = item.current_bidder
    item.current_bidder = bidder
    item.save() 
    
    if old_bidder: 
        outbid = OutBid(user=old_bidder, item=item, bidder=bidder, bid=bid_amount)
        outbid.save() 

    query = OutBid.objects.filter(item__in = item)
    for bid in query: 
        bid.bid_amount = bid_amount
        bid.bidder = bidder 
        bid.save() 
    
    
    return Response({"detail": "Bid successful."}, 
                    status=status.HTTP_200_OK)









 
