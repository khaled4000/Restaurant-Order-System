from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from .serializers import SignUpSerializer
from rest_framework import status
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny , IsAuthenticated
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate


# generate token for superuser
@api_view(['POST'])
@permission_classes([AllowAny])
def generate_token(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    # Authenticate the user based on the provided credentials
    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_superuser:
        # Generate token for the authenticated superuser
        refresh = RefreshToken.for_user(user)
        return Response({
            'token_access': str(refresh.access_token),
            'message': 'Token generated successfully',
        }, status=status.HTTP_200_OK)
    else:
        # Invalid credentials or user is not a superuser
        return Response({'message': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
    

# register view to create a new user
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username = data['username']).exists():
            user = User.objects.create(username = data['username'], email = data['email'], password = make_password(data['password']), phone_number = data['phone_number'])
            send_verification_email(request, user)
            user.is_active = False
            user.save()
            return Response({'message':'User created successfully , please verify you\'re email .'},status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Username already exists'},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user.errors,status=status.HTTP_400_BAD_REQUEST)




# profile view to check if user is authenticated
# token should be passed in the header with key 'Authorization' and value 'Bearer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'message':'User is authenticated'},status=status.HTTP_200_OK)



# login view is user is verified email
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    user = User.objects.get(username=data['username'])

    if user.is_active:
        if user.check_password(data['password']):
            refresh = RefreshToken.for_user(user)
            return Response({
                'user':{
                    'id':user.id,
                    'username':user.username,
                    'email':user.email,
                    'phone':user.phone_number,
                    'token_access': str(refresh.access_token)
                },
                'message':'User logged in successfully',
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Invalid username or  password'},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message':'Please verify your email first'},status=status.HTTP_400_BAD_REQUEST)



# email verification
def send_verification_email(request, user):
    email_subject = 'Verify your email'
    email_body = f'Hi {user.username}, click the link below to verify your email\n\n{get_verification_link(request, user)}'
    email = EmailMessage(
        subject=email_subject,
        body=email_body,
        to=[user.email]
    )
    email.send()



#generate a link for account verification based on userid and token
def get_verification_link(request, user):
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    return f'https://deploy-test-xspm.onrender.com/auth/verify/{uidb64}/{token}/'



# verify email
def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = get_user_model().objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse('Email verified successfully!')
    else:
        return HttpResponse('Invalid link')

