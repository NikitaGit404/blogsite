from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BlogPost, Login
from django.http import Http404
from rest_framework.response import Response
from .serializers import BlogPostSerializer
from django.contrib.auth.hashers import make_password, check_password


# Create your views here.
class LoginAPIView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'message': 'Username and password are required'}, status=400)

        try:
            user = Login.objects.get(username=username)
            if check_password(password, user.password):
                return Response({'message': 'Login Successful', 'username':username}, status=200)
            else:
                return Response({'message': 'Incorrect Password', 'username':username}, status=401)
        except Login.DoesNotExist:
            hashed_password = make_password(password)
            user = Login(username=username, password=hashed_password)
            user.save()
            return Response({'message': 'User Created Successfully', 'username':username}, status=201)

class BlogPostAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def get_object(self, pk):
        try:
            return BlogPost.objects.get(pk=pk)
        except BlogPost.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        if pk:
            blog_post = self.get_object(pk)
            serializer = BlogPostSerializer(blog_post)
        else:
            blog_post = BlogPost.objects.all()
            serializer = BlogPostSerializer(blog_post, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'BlogPost Created Successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, pk=None, format=None):
        blog_post = self.get_object(pk)
        print(blog_post)
        print(request.data, pk)
        serializer = BlogPostSerializer(blog_post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'BlogPost Updated Successfully', 'data': serializer.data}, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk, format=None):
        blog_post = self.get_object(pk)
        blog_post.delete()
        return Response({'message': 'BlogPost Deleted Successfully'}, status=204)

# class BlogPostListCreate(generics.ListCreateAPIView):
#     queryset = BlogPost.objects.all()
#     serializer_class = BlogPostSerializer

# class BlogPostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = BlogPost.objects.all()
#     serializer_class = BlogPostSerializer
#     lookup_field = "pk"

