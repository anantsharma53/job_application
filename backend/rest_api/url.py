from django.urls import path
from .views import SignUpView, SignInView, JobApplicationAPIView, ApplicantInformationView, UploadFilesAPIView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('job-application/', JobApplicationAPIView.as_view(), name='job-application'),
    path('applicant-information/', ApplicantInformationView.as_view(), name='applicant-information'),
    path('upload-files/<str:application_number>/', UploadFilesAPIView.as_view(), name='upload-files'),
    # Add other URL patterns as needed
]
