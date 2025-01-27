from rest_framework import generics, viewsets
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import action
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
import re
from django.db.models import Q
from django.db import IntegrityError
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
from django.contrib import messages
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
    chars = string.ascii_uppercase
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


@csrf_protect
def dev_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            if user.is_active:
                if user.is_staff:
                    login(request, user)
                    return redirect('documentation')
                else:
                    messages.warning(request, 'Sorry, you do not have permission to login as a developer!')
                    return redirect('dev_login')
            else:
                messages.warning(request, 'Your account has been disabled. Contact the admin for assistance.')
                return redirect('dev_login')
        else:
            messages.warning(request, 'Invalid Login Credentials!')
            return redirect('dev_login')
    return render(request, 'login.html')


@login_required(login_url="dev_login")
@staff_required
def dev_logout(request):
    logout(request)
    messages.warning(request, "You have been logged out, enter your details to log back in")
    return redirect('dev_login')


@login_required(login_url="dev_login")
@staff_required
@csrf_protect
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


class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [TokenAuthentication]

    @action(detail=False,
            methods=['get'])
    def student_list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            page = self.request.query_params.get('page')
            per_page = self.request.query_params.get('pagesize')
            query = self.request.query_params.get('search', '')
            class_slug = self.request.query_params.get('class_slug')
            order = self.request.query_params.get('sort_by', 'firstName')
            try:
                page = int(page) if page else 1
                per_page = int(per_page) if per_page else 20
                start = (page - 1) * per_page
                stop = page * per_page
                total_items = 0
                students = None
                if not class_slug:
                    total_items = Student.objects.filter(firstName__icontains=query, lastName__icontains=query,
                                                         middleName__icontains=query, studentId__icontains=query).count()
                    students = Student.objects.filter(firstName__icontains=query, lastName__icontains=query,
                                                     middleName__icontains=query, studentId__icontains=query)\
                                  .order_by(order)[start:stop]
                else:
                    try:
                        classroom = Classroom.objects.get(slug=class_slug)
                    except Classroom.DoesNotExist:
                        return Response({
                            'status': 'error',
                            'message': 'Invalid classroom parameter'
                        }, status=404)
                    total_items = classroom.students.filter(firstName__icontains=query, lastName__icontains=query,
                                                         middleName__icontains=query, studentId__icontains=query).count()
                    students = classroom.students.filter(firstName__icontains=query, lastName__icontains=query,
                                                      middleName__icontains=query, studentId__icontains=query) \
                                   .order_by(order)[start:stop]
                total_pages = math.ceil(total_items / per_page)
                if students.exists():
                    return Response({
                        'status': 'success',
                        'data': [UserSerializer(pos).data for pos in students],
                        'message': 'student list retrieved',
                        'page_number': page,
                        "items_per_page": per_page,
                        "total_pages": total_pages,
                        "total_items": total_items,
                        "search_query": query,
                        "sort_by": order,
                        "filters": {"classroom": class_slug if class_slug else None}
                    }, status=200)
                else:
                    return Response({
                        'status': 'success',
                        'message': 'No student found',
                        'page_number': page,
                        "items_per_page": per_page,
                        "total_pages": total_pages,
                        "total_items": total_items,
                        "search_query": query,
                        "sort_by": order,
                        "filters": {"classroom": class_slug if class_slug else None}
                    }, status=200)
            except Exception as e:
                return Response({
                    'status': "error",
                    "message": f"Error occurred: {e}"
                }, status=500)
        else:
            return Response({
                'status': "error",
                "message": f"Request not authorized"
            }, status=401)

    @action(detail=False,
            methods=['post'])
    def add_student(self, request, *args, **kwargs):
        fname = request.data.get('first_name', '')
        lname = request.data.get('last_name', '')
        mname = request.data.get('middle_name', '')
        address = request.data.get('address', '')
        email = request.data.get('email', '')
        phone = request.data.get('phone_number', '')
        gender = request.data.get('gender', '')
        nation = request.data.get('nationality', 'Nigeria')
        state = request.data.get('state_of_origin', '')
        lga = request.data.get('local_government', '')
        class_slug = request.data.get('class_slug', '')
        try:
            if not class_slug:
                return Response({
                    'status': "error",
                    'message': "Classroom not assigned"
                }, status=401)
            try:
                classroom = Classroom.objects.get(slug=class_slug)
            except Classroom.DoesNotExist:
                return Response({
                    'status': 'error',
                    "message": "Invalid classroom parameter"
                })
            no_of_students = classroom.students.count()
            current_year = f"{datetime.now().year}"[2:]
            ident = generate_key(3)
            roll_no = f"{(no_of_students + 1) : 03}"
            student_id = f"{current_year}/{ident}{roll_no}"
            new_user = User.objects.create(username=student_id)
            new_user.set_password(fname.strip().upper())
            new_user.save()
            new_student = Student(user=new_user, firstName=fname, lastName=lname, middleName=mname,
                                 studentId=student_id, classroom=classroom)
            new_student.save()
            new_student.contactInfo["address"] = address
            new_student.contactInfo["email"] = email
            new_student.contactInfo["phone_number"] = phone
            new_student.personalInfo["gender"] = gender
            new_student.personalInfo["nationality"] = nation
            new_student.personalInfo["state_of_origin"] = state
            new_student.personalInfo["lga"] = lga
            new_student.save()
            classroom.students.add(new_student)
            classroom.save()
            return Response({
                'status': 'success',
                'message': f'Student \"{new_student.firstName} {new_student.lastName} - {new_student.studentId}\" added successfully.'
            })
        except Exception as e:
            return Response({
                'status': "error",
                "message": f"Error occurred: {e}"
            }, status=500)


class ClassroomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [TokenAuthentication]

    @action(detail=False,
            methods=['get'])
    def classroom_list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            try:
                classrooms = Classroom.objects.all()
                if classrooms.exists():
                    return Response({
                        'status': 'success',
                        'data': [ClassroomSerializer(pos).data for pos in classrooms],
                        'message': 'class list retrieved'
                    }, status=200)
                else:
                    return Response({
                        'status': 'success',
                        'message': 'No class found',
                    }, status=200)
            except Exception as e:
                return Response({
                    'status': "error",
                    "message": f"Error occurred: {e}"
                }, status=500)
        else:
            return Response({
                'status': "error",
                "message": f"Request not authorized"
            }, status=401)

    @action(detail=False,
            methods=['post'])
    def add_classroom(self, request, *args, **kwargs):
        title = request.data.get('title')
        level = request.data.get('level')
        staff_id = request.data.get('staff_id')
        try:
            if not title or not level:
                return Response({
                    'status': "error",
                    'message': "Invalid parameters"
                }, status=401)
            slug = slugify(title)
            new_class = Classroom(title=title, slug=slug, level=int(level))
            new_class.save()
            if staff_id:
                try:
                    staff = Teacher.objects.get(staffId=staff_id)
                    new_class.teacher = staff
                    new_class.save()
                except Teacher.DoesNotExist:
                    return Response({
                        'status': 'success',
                        'message': f'New classroom \"{new_class.title}\" created. Invalid staff ID'
                    })
            return Response({
                'status': 'success',
                'message': f'New classroom \"{new_class.title}\" created successfully.'
            })
        except IntegrityError:
            return Response({
                'status': "error",
                'message': "Classroom with the same level or title already exists."
            }, status=401)
        except Exception as e:
            return Response({
                'status': "error",
                "message": f"Error occurred: {e}"
            }, status=500)


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
