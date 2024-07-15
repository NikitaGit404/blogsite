from django.db import models

# Create your models here.
class BlogPost(models.Model):
    title = models.TextField()
    description = models.TextField()
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=100)
    cover_picture = models.ImageField(upload_to="images/", blank=True, null=True)
    
    def __str__(self):
        return self.title
    
class Login(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username