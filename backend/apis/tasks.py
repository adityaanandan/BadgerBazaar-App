from celery import shared_task
from django.core.management import call_command
from django.utils import timezone
from .models import Item

@shared_task
def check_expired_listings():
    
    count = 0 
    items = Item.objects.filter(sell_by__lt=timezone.now())
    print("Checking expired listings...")
    for item in items:
        item.is_sold = True
        item.save()
        count += 1
    return f'{count} items have been marked as sold.'