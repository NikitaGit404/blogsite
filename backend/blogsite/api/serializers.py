from rest_framework import serializers
from .models import BlogPost, Login

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ['username', 'password']