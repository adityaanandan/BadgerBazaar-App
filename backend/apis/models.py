from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.


class Profile(models.Model):
    user  = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default = "")
    bio = models.TextField()
    follows = models.ManyToManyField("self", related_name="followed_by", symmetrical = False, blank=True)
    profile_img = models.ImageField(upload_to="profile_img", blank=True, null=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="item_imgs", blank=True, null=True)
    starting_price = models.FloatField()
    current_bidder = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="current_bids")
    is_sold = models.BooleanField(default=False)
    is_transferred = models.BooleanField(default=False)



def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()



post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


