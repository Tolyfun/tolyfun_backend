from rest_framework import generics, viewsets
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import action
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
import re
from django.db.models import Q
from .encrypt_utils import encrypt, decrypt
from .decorators import staff_required, superuser_required
from django.utils.crypto import get_random_string
from django.contrib.auth.decorators import login_required
import random
from .utils import *
import string
from django.http import FileResponse, HttpResponse
from django.core.files.base import ContentFile
from io import BytesIO
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from datetime import datetime, timedelta
import io
import json
import math
from django.db import IntegrityError
from django.conf import settings
from .py_paystack import Paystack

paystack_init = Paystack(settings.PAYSTACK_SECRET_KEY)


# Create your views here.
def slugify(s):
    s = s.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_-]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s


def generate_token():
    key = ''
    for i in range(60):
        rand_char = random.choice("abcdefghijklmnopqrstuvwxyz1234567890")
        key += rand_char
    return key


def generate(n):
    chars = string.ascii_lowercase + string.digits
    random_combination = ''.join(random.choice(chars) for _ in range(n))
    return random_combination


def generate_key(n):
    chars = string.ascii_uppercase + string.digits
    random_combination = ''.join(random.choice(chars) for _ in range(n))
    return random_combination


def generateCode(n):
    key = ''
    for i in range(n):
        rand_char = random.choice("1234567890")
        key += rand_char
    return key


def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if re.match(pattern, email):
        return True
    else:
        return False


def is_valid_password(password):
    if len(password) < 8:
        return False
    if not re.search(r'[a-zA-Z]', password) or not re.search(r'\d', password):
        return False
    return True


def is_valid_username(username):
    pattern = r'^[a-zA-Z0-9]+$'
    if re.match(pattern, username):
        return True
    else:
        return False


def dev_login(request):
    return render(request, "login.html")


@login_required(login_url="dev_login")
@superuser_required
def documentation(request):
    return render(request, "index.html")


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({
                    'message': "Invalid login credentials."
                })
        if user.check_password(password):
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                profile = Student.objects.get(user=user)
                if not profile.confirmedEmail:
                    return Response({
                        'message': f"Your account has not been activated. Please confirm your email to activate your account"
                    })
                if profile._2fa_enabled:
                    code = generateCode(8)
                    profile._2fa_code = code
                    profile.save()
                    confirmation_login(user.email, profile.firstName, code)
                    profile._2fa_date = timezone.now()
                    profile.save()
                    ho = user.email.split('@')[1]
                    return Response({
                        'message': f"Confirmation code has been sent to {user.email[:5]}*****@{ho}. It expires in 10 minutes.",
                        'email': user.email
                    })
                else:
                    # token.delete()
                    # new_token = Token.objects.create(user=user)
                    Log.objects.create(log=f"{user.username} logged in.", details={
                        "profile_id": f"{profile.profileId}",
                        "2FA_enabled": False
                    })
                    return Response({
                        'token': token.key,
                        'user': {
                            "email": user.email,
                            "name": f"{user.first_name} {user.last_name}"
                        }
                    })
            else:
                return Response({
                    'message': "Your account has been deactivated. Kindly contact the administrator for more enquiries."
                })
        else:
            return Response({
                'message': "Invalid login credentials."
            })


class SchoolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [AllowAny]

    @action(detail=False,
            methods=['get'])
    def get_testimonials(self, request, *args, **kwargs):
        try:
            testimonials = Testimonial.objects.all()
            if testimonials.exists():
                return Response({
                    'status': "success",
                    "message": "testimonials fetched",
                    'data': [TestimonialSerializer(c).data for c in testimonials]
                }, status=200)
            else:
                return Response({
                    'status': 'success',
                    'message': "No testimonial found",
                }, status=200)
        except Exception as e:
            return Response({
                'status': "error",
                "message": f"{e}: Error occurred while getting testimonial list"
            }, status=500)

    @action(detail=False,
            methods=['post'])
    def join_newsletter(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not is_valid_email(email):
            return Response({
                "status": "error",
                "message": "Invalid email"
            }, status=400)
        try:
            Newsletter.objects.create(email=email)
            return Response({
                "status": "success",
                "message": "You have successfully subscribed to our newsletter"
            }, status=200)
        except IntegrityError:
            return Response({
                "status": "error",
                "message": f"Sorry, this email is already subscribed to our newsletter"
            })
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"{e}"
            })


class SetupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [AllowAny]

    @action(detail=False,
            methods=['post'])
    def create_account(self, request, *args, **kwargs):
        email = request.data.get('email')
        f_name = request.data.get('first_name')
        l_name = request.data.get('last_name')
        password = request.data.get('password')
        # check if email is valid
        if not is_valid_email(email):
            return Response({
                'status': 'error',
                'message': f"Invalid email",
            })
        if not is_valid_password(password):
            return Response({
                'status': 'error',
                'message': f"Invalid password combination (minimum of 8 characters including letters, numbers and special characters)",
            })
        try:
            # check if username and email does not exist
            usernames = []
            emails = []
            users = User.objects.all()
            for user in users:
                emails.append(user.email)
            if email not in emails:
                new_user = User(email=email, first_name=f_name, last_name=l_name, username=email)
                new_user.set_password(password)
                new_user.save()
                try:
                    code = generateCode(8)
                    id = generate_key(8)
                    """
                    protocol = 'https://' if self.request.is_secure() else 'http://'
                    host_name = self.request.get_host()
                    full_url = f"{protocol}{host_name}/verify_email/{code}/"
                    """
                    data = {
                        "courses": []
                    }
                    # create a new profile
                    new_profile = Student(user=new_user, email=email, firstName=f_name,
                                          lastName=l_name, confirmationCode=code,
                                          profileId=id, userData=data)
                    # print('he')
                    new_profile.save()
                    confirmation_email(email, f_name, code)
                    Notification.objects.create(
                        user=new_profile,
                        title="Welcome To Hoistflick",
                        details={
                            "type": "account",
                            "message": "We welcome you to Hoistflick. A verified digital skill acquisition platform"
                        }
                    )
                    new_profile.confirmationDate = timezone.now()
                    new_profile.save()
                    Log.objects.create(log=f"{new_user.username} created an account.", details={
                        "profile_id": f"{new_profile.profileId}"
                    })
                    return Response({
                        'status': 'success',
                        'email': email,
                        'message': f'Account created successfully. Confirmation code has been sent to {email}. It expires in 10 minutes.',
                    })
                except Exception as e:
                    return Response({
                        'status': 'error',
                        'message': f'{e}: Account created, Error generating profile',
                    })
            elif email in emails:
                return Response({
                    'status': 'error',
                    'message': f"Email {email} has already been used. Kindly use another email.",
                })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': f'Error occurred while creating account: {e}',
            })

    @action(detail=False,
            methods=['post'])
    def confirm_email(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = request.data.get('email')
        try:
            user = Student.objects.get(email=email)
            d = timezone.now()
            diff = d - user.confirmationDate
            if diff >= timedelta(minutes=10):
                user.confirmationCode = None
                user.save()
                return Response({
                    'status': 'error',
                    'message': "Confirmation code has already expired. kindly request another confirmation code.",
                })
            if user.confirmationCode == code:
                user.confirmedEmail = True
                user.save()
                Log.objects.create(log=f"{user.profileId} confirmed email.", details={
                    "profile_id": f"{user.profileId}",
                    "type": "account_creation"
                })
                return Response({
                    'status': "success",
                    "message": "Email confirmed successfully."
                })
            else:
                return Response({
                    'status': 'error',
                    'message': "Invalid Confirmation Code",
                })
        except Student.DoesNotExist:
            return Response({
                'status': 'error',
                'message': "Unregistered Email",
            })

    @action(detail=False,
            methods=['post'])
    def confirm_login(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = request.data.get('email')
        try:
            user = Student.objects.get(email=email)
            d = timezone.now()
            diff = d - user._2fa_date
            if diff >= timedelta(minutes=10):
                user._2fa_code = None
                user.save()
                return Response({
                    'status': 'error',
                    'message': "Confirmation code has already expired. kindly login again to get another confirmation code.",
                })
            if user._2fa_code == code:
                token = Token.objects.get(user=user.user)
                # token.delete()
                # new_token = Token.objects.create(user=user.user)
                user._2fa_code = None
                user.save()
                Log.objects.create(log=f"{user.profileId} confirmed email.", details={
                    "profile_id": f"{user.profileId}",
                    "type": "2fa_login"
                })
                return Response({
                    'token': token.key
                })
            else:
                return Response({
                    'status': 'error',
                    'message': "Invalid Confirmation Code",
                })
        except Student.DoesNotExist:
            return Response({
                'status': 'error',
                'message': "Unregistered Email",
            })

    @action(detail=False,
            methods=['post'])
    def request_confirm_email(self, request, *args, **kwargs):
        code = generateCode(8)
        email = request.data.get('email')
        try:
            user = Student.objects.get(email=email)
            if user is not None:
                if not user.confirmedEmail:
                    user.confirmationCode = code
                    user.save()
                    confirmation_email(email, user.firstName, code)
                    user.confirmationDate = timezone.now()
                    user.save()
                    Log.objects.create(log=f"{user.profileId} requested for confirmation email", details={
                        "profile_id": f"{user.profileId}",
                        "type": "account_creation"
                    })
                    return Response({
                        'status': "success",
                        'email': email,
                        "message": f"Confirmation code has been resent to {email}. It expires in 10 minutes"
                    })
                else:
                    return Response({
                        'status': 'error',
                        'message': "Email has already been confirmed",
                    })
            else:
                return Response({
                    'status': 'error',
                    'message': "Unregistered Email",
                })
        except Student.DoesNotExist:
            return Response({
                'status': 'error',
                'message': "Unregistered Email",
            })

    @action(detail=False,
            methods=['post'])
    def forgot_password(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not is_valid_email(email):
            return Response({
                'status': 'error',
                'message': f"Invalid email",
            })
        try:
            user = User.objects.get(email=email)
            if user is not None:
                token = get_random_string(length=8)
                user.set_password(token)
                user.save()
                # send email
                send_password_email(email, user.first_name, token)
                return Response({
                    'status': 'success',
                    'message': f'Password reset instructions has been sent to {email}'
                })
            else:
                return Response({
                    'status': 'error',
                    'message': f"Unregistered email",
                })
        except User.DoesNotExist:
            return Response({
                'status': 'error',
                'message': f"Unregistered email",
            })


class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @action(detail=False,
            methods=['get'])
    def user_profile(self, request, *args, **kwargs):
        try:
            profile = Student.objects.get(user=request.user)
            if profile is not None:
                return Response({
                    'status': "success",
                    "message": "data fetched successfully",
                    "data": StudentSerializer(profile).data
                })
            else:
                return Response({
                    'status': "error",
                    "message": "Invalid token"
                })
        except Exception as e:
            return Response({
                'status': "error",
                "message": f"Invalid token: {e}"
            })

    @action(detail=False,
            methods=['post'])
    def auth_2fa(self, request, *args, **kwargs):
        password = request.data.get('password')
        act = request.data.get('action')
        try:
            user = Student.objects.get(user=request.user)
            if request.user.check_password(password):
                if act is None:
                    return Response({
                        'status': 'error',
                        'message': "Invalid action parameter.",
                    })
                if act.lower() == "activate":
                    user._2fa_enabled = True
                    user.save()
                elif act.lower() == "deactivate":
                    user._2fa_enabled = False
                    user.save()
                else:
                    return Response({
                        'status': 'error',
                        'message': "Invalid action parameter.",
                    })
                return Response({
                    'status': "success",
                    "message": f"2 factor authentication {act}d."
                })
            else:
                return Response({
                    'status': 'error',
                    'message': "Incorrect password",
                })
        except Student.DoesNotExist:
            return Response({
                'status': 'error',
                'message': "Unauthorized request",
            })

    @action(detail=False,
            methods=['post'])
    def change_password(self, request, *args, **kwargs):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        try:
            profile = Student.objects.get(user=request.user)
            if not is_valid_password(new_password):
                return Response({
                    'status': 'error',
                    'message': f"Invalid new password combination",
                })
            try:
                if request.user.check_password(old_password):
                    request.user.set_password(new_password)
                    request.user.save()
                    return Response({
                        'status': "success",
                        "message": "Your password has been reset successfully!",
                    })
                else:
                    return Response({
                        'status': "error",
                        "message": "Incorrect password",
                    })
            except Exception as e:
                return Response({
                    'status': "error",
                    "message": f"error occured: {e}",
                })
        except:
            return Response({
                'status': "error",
                "message": "Invalid token"
            })


class WebhookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Webhook.objects.all()
    serializer_class = WebhookSerializer
    permission_classes = [AllowAny]

    @action(detail=False,
            methods=['post'])
    def paystack_webhooks(self, request, *args, **kwargs):
        body = json.loads(request.body.decode('utf-8'))
        event = body["event"]
        data = body["data"]
        new_hook = Webhook.objects.create(details=body)
        if event == "charge.success":
            new_hook.type = "Transaction"
            new_hook.reference = data["reference"]
            new_hook.save()
            amount = data["amount"] / 100
            # get customer
            customer_email = data["customer"]["email"]
            try:
                student = Student.objects.get(email=customer_email)
                try:
                    new_trans = Transaction.objects.get(reference_id=data["reference"])
                    if new_trans.amount == amount:
                        new_trans.status = data["status"]
                        new_trans.save()
                except Transaction.DoesNotExist:
                    pass
                Notification.objects.create(
                    user=student, title="Transaction Notification", details={
                        "type": "payment",
                        "message": f"Your transaction ID: {new_trans.reference_id} is now {new_trans.status}",
                        "amount": str(new_trans.amount),
                        "payment_method": data["channel"]
                    }
                )
                Log.objects.create(
                    log=f"{student.profileId} paid {data['currency']}{amount}.",
                    details={
                        "transaction_id": new_trans.reference_id,
                        "amount": amount
                    }
                )
            except Student.DoesNotExist:
                pass
        return HttpResponse(status=200)
