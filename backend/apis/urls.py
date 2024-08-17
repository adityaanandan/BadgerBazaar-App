from django.urls import re_path
from .views import user_views
from .views import item_views

urlpatterns = [
    re_path('user/login', user_views.login), 
    re_path('user/signup', user_views.signup),
    re_path('user/logout', user_views.logout),
    re_path('user/test_token', user_views.test_token),
    re_path('user/follow_user', user_views.follow_user),
    re_path('user/unfollow_user', user_views.unfollow_user),
    re_path('user/update_user_profile', user_views.update_user_profile),
    re_path('items/get_items_by_owner', item_views.get_items_by_owner),
    re_path('items/add_item', item_views.add_item),
    re_path('items/get_items_by_category/(?P<category>\w+)', item_views.get_items_by_category),
    re_path('items/bid', item_views.bid_on_item), 
    re_path('items/items_by_bidder', item_views.get_items_by_bidder),
]