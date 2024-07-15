from django.urls import path
from .views import BlogPostAPIView, LoginAPIView

urlpatterns = [
    path("blogposts/", BlogPostAPIView.as_view(), name="list"),
    path("blogposts/<int:pk>", BlogPostAPIView.as_view(), name="update"),
    path("blogposts/login", LoginAPIView.as_view(), name="login"),
]