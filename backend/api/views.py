from django.shortcuts import render

# Added imports -LA
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Importing Note and import its serializer above
from .models import Note

# Create your views here.

# Creating for Note
class NoteListCreate(generics.ListCreateAPIView): # It will all Notes user created and it will create
    serializer_class = NoteSerializer
    # Means that you cannot go to this root unless you are authenticated and has valid JWT token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user # get the user that is actually authenticated
        # To get all Notes from different users
        # return Note.objects.all
        # To get all Notes by the user authenticated PS: you can filter more fields
        return Note.objects.filter(author=user)

    # check if the fields when creating notes are valid and saved with author included
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# Deleting Note
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

# Views by -LA
class CreateUserView(generics.CreateAPIView):
    # list all of object users to avoid making duplication
    queryset = User.objects.all()
    # define what data to accept in the new user
    serializer_class = UserSerializer
    permission_classes = [AllowAny]