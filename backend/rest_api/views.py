from django.views import View
from .serializers import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from decimal import Decimal
import json
from .models import *

class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return JsonResponse(
                {"refresh": str(refresh), "access": str(refresh.access_token)},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.error, status.HTTP_400_BAD_REQUEST, safe=False)

class SignInView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        user_data = {}
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "name": user.name,
                "mobile_number": user.mobile_number,
                "is_candiate": user.is_candidate,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            }
            return JsonResponse(
                {
                    "user": user_data,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.error, status.HTTP_400_BAD_REQUEST, safe=False)


class JobApplicationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Include the 'user' field in the data
        data = request.data.copy()
        data['user'] = request.user.id  # Assuming you want to associate the current user with the application

        serializer = JobApplicationSerializer(data=data)
        if serializer.is_valid():
            job_application = serializer.save()

            # Generate application number based on post name and user id
            application_number = f"{job_application.post}_{job_application.id}"
            
            # Access the related ApplicantInformation instance through the correct field name
            job_application.application_number = application_number
            job_application.save()

            return Response({"application_number": application_number}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicantInformationView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        try:
            applicant_info = ApplicantInformation.objects.get(user=user)
            serializer = ApplicantInformationSerializer(applicant_info)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ApplicantInformation.DoesNotExist:
            return Response({"detail": "Applicant information not found."}, status=status.HTTP_404_NOT_FOUND)

class UploadFilesAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, application_number, *args, **kwargs):
        job_application = get_object_or_404(JobApplication, application_number=application_number)

        # Check if the user is the owner of the job application
        if request.user.id != job_application.id:
            return Response({"detail": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        serializer = JobApplicationSerializer(job_application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
