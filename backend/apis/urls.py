from django.urls import re_path
from .views import user_views
from .views import item_views

urlpatterns = [
    re_path('user/login', user_views.login), 
    re_path('user/signup', user_views.signup),
    re_path('user/logout', user_views.logout),
    re_path('user/test_token', user_views.test_token),
    re_path('user/get_profile', user_views.get_profile),
    re_path('user/edit_profile', user_views.edit_profile),
    re_path('items/user_items', item_views.get_user_items),
    re_path('items/user_bids', item_views.get_user_bids),
    re_path('items/add_item', item_views.add_item),
    re_path('items/get_items_by_category/(?P<category>\w+)', item_views.get_items_by_category),
    re_path('items/bid', item_views.bid_on_item), 
    re_path('items/items_by_bidder', item_views.get_items_by_bidder),
]