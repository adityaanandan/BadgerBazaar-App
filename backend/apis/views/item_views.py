from ..models import Item, Profile, OutBid
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import ItemSerializer, OutBidSerializer
from rest_framework import status
from django.contrib.auth.models import User
import json
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from django.db import IntegrityError
from datetime import datetime

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_bids(request): 
    user = request.user 
    profile = Profile.objects.filter(user = user)[0]
    outbids = OutBid.objects.filter(bidder = profile)
    items = Item.objects.filter(current_bidder = profile)

    outbid_serializer = OutBidSerializer(instance = outbids, many=True)
    items_serializer = ItemSerializer(instance = items, many=True)
    return Response({"outbids": outbid_serializer.data, "highest": items_serializer.data})


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
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_items(request):
    item_user = request.user 
    if not item_user:
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    owner = Profile.objects.filter(user = item_user)[0]
    items = Item.objects.filter(owner = owner)
    serializer = ItemSerializer(instance = items, many=True)
    for item, item_obj in zip(serializer.data, items):
        item['id'] = item_obj.id
    return Response(serializer.data, 
                    status=status.HTTP_200_OK)
    



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_items_by_bidder(request):
    bidder = request.user
    profile = Profile.objects.get(user=bidder)
    items = Item.objects.filter(current_bidder=profile)
    serializer = ItemSerializer(instance = items, many=True)
    return Response(serializer.data,
                    status=status.HTTP_200_OK) 

 


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def add_item(request):
    user_profile = request.user 
    owner = Profile.objects.filter(user = user_profile)[0]
    
    data = request.data
    item_name = data.get('name', "")
    item_description = data.get('description', "")

    if not item_name or not item_description: 
        return Response({"detail": "Name and description required."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    item_image = None
    
    if "item_img" in request.FILES:
        item_image = request.FILES['item_img']

    
    item_date = data.get('date', None)
    if item_date is None: 
        return Response({"detail": "Date required."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    item_date = datetime.fromisoformat(item_date.replace('Z', '+00:00'))
    item_starting_price = data.get('price', 0.0)
    item_starting_price = int(item_starting_price)
    if item_starting_price <= 0.0: 
        return Response({"detail": "Starting price must be greater than 0."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    item_category = data.get('category', None)

    try:
        item = Item(owner=owner, name=item_name, description=item_description, image = item_image, starting_price=item_starting_price, category=item_category, sell_by = item_date)
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
    user_profile = request.user 
    bidder = Profile.objects.filter(user = user_profile)[0] 
    
    
    data = json.loads(request.body)
    item_id = data.get('item_id')
    bid_amount = data.get('bid_amount')
    item = Item.objects.filter(id=item_id)[0]
    if not item:
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    if item.starting_price >= bid_amount or item.current_bid >= bid_amount:
        return Response({"detail": "Bid amount too low."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    # if user had been outbid, delete their outbid from database 
    query = OutBid.objects.filter(item = item, user = bidder)
    for bid in query: 
        bid.delete()
    # notify old current bidder that they have been outbid
    old_bidder = item.current_bidder
    item.current_bidder = bidder
    item.current_bid = bid_amount
    item.save() 
    
    if old_bidder: 
        outbid = OutBid(user=old_bidder, item=item, bidder=bidder, bid=bid_amount)
        outbid.save() 

    query = OutBid.objects.filter(item = item)
    for bid in query: 
        bid.bid_amount = bid_amount
        bid.bidder = bidder 
        bid.save() 
    
    
    return Response({"detail": "Bid successful."}, 
                    status=status.HTTP_200_OK)

@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_oubids_by_user(request):
    user = request.user 
    profile = Profile.objects.filter(user = user)[0]
    outbids = OutBid.objects.filter(user__in = profile)
    serializer = OutBidSerializer(instance = outbids, many=True)
    return Response(serializer.data, 
                    status=status.HTTP_200_OK)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def decline_bid(request): 
    user = request.user 
    profile = Profile.objects.filter(user__in = user)[0]
    outbids = OutBid.objects.filter(user__in = profile)
    data = json.loads(request.body)
    item_id = data.get('item_id')
    item = Item.objects.filter(id=item_id)
    if not item:
        return Response({"detail": "Not found."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    query = OutBid.objects.filter(item__in = item, user__in = profile)
    for bid in query: 
        bid.delete()
    return Response({"detail": "Bid declined."}, 
                    status=status.HTTP_200_OK)

@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def complete_transaction(request):
    ## final bidder pays for item, payment comes to my acct 
    ## I transfer money to seller, taking 5% commission
    ## Item is marked as sold and transferred (user can close item now)
    ## All outbids are deleted and users are notified 
    
    pass















 
