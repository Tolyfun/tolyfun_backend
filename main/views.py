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


#@login_required(login_url="dev_login")
#@superuser_required
def documentation(request):
    return render(request, "index.html")


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
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
            if user.is_superuser:
                token, created = Token.objects.get_or_create(user=user)
                admin = Owner.objects.get(user=user)
                # send verification code
                code = generateCode(8)
                admin._2fa_code = code
                admin.save()
                confirmation_login(user.email, "Admin", code)
                admin._2fa_date = timezone.now()
                admin.save()
                ho = user.email.split('@')[1]
                return Response({
                    'message': f"Confirmation code has been sent to {user.email[:5]}****@{ho}. It expires in 10 minutes.",
                    'email': user.email
                })
            else:
                return Response({
                    'message': "User is not authorized for this operation."
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
    def get_info(self, request, *args, **kwargs):
        try:
            school = School.objects.first()
            return Response({
                    'status': "success",
                    "message": "school info fetched",
                    'data': SchoolSerializer(school).data
            }, status=200)
        except School.DoesNotExist:
            return Response({
                'status': 'success',
                'message': "School info has not been created yet"
            }, status=200)
        except Exception as e:
            return Response({
                'status': "error",
                "message": f"{e}: Error occurred while getting school info"
            }, status=500)


class SetupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [AllowAny]

    @action(detail=False,
            methods=['post'])
    def confirm_login(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = request.data.get('email')
        try:
            user = Owner.objects.get(user__email=email, user__is_superuser=True)
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
                token.delete()
                new_token = Token.objects.create(user=user.user)
                user._2fa_code = None
                user.save()
                Log.objects.create(log=f"{user.user.username} confirmed email for login.", details={
                    "username": f"{user.user.username}",
                    "type": "2fa_login"
                })
                return Response({
                    'token': new_token.key
                })
            else:
                return Response({
                    'status': 'error',
                    'message': "Invalid Confirmation Code",
                })
        except User.DoesNotExist:
            return Response({
                'status': 'error',
                'message': "Invalid Email",
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
