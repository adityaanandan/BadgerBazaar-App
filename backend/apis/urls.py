from django.urls import re_path
from .views import user_views

urlpatterns = [
    re_path('login', user_views.login), 
    re_path('signup', user_views.signup),
    re_path('logout', user_views.logout),
    re_path('test_token', user_views.test_token)
]