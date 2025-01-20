from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from tinymce.models import HTMLField
from django.utils.encoding import force_str
import re
import random
from .utils import *


def generateCode(n):
    key = ''
    for i in range(n):
        rand_char = random.choice("1234567890")
        key += rand_char
    return key


def personal_info():
    return {"gender": "", "nationality": "Nigeria", "state_of_origin": "", "lga": "", "hometown": ""}


def medical_info():
    return {"blood_group": "", "genotype": "", "medical_conditions": []}


def parent_info():
    return [{"relationship": "", "address": "", "email": "", "phone_number": ""}]


def contact_info():
    return {"address": "", "email": "", "phone_number": ""}


def school_socials():
    return {"linkedin": "", "twitter": "", "facebook": "", "website": ""}


# Create your models here.
class School(models.Model):
    name = models.CharField(max_length=100, default="", blank=True)
    motto = models.CharField(max_length=255, default="", blank=True)
    logo = models.ImageField(upload_to="logo/", null=True, blank=True)
    icon = models.ImageField(upload_to="icon/", null=True, blank=True)
    primary_email = models.EmailField(blank=True)
    secondary_email = models.EmailField(blank=True)
    primary_phone = models.CharField(max_length=15, blank=True)
    secondary_phone = models.CharField(max_length=15, blank=True)
    privacy_policy = HTMLField(blank=True)
    terms_of_use = HTMLField(blank=True)
    about = HTMLField(blank=True)
    socials = models.JSONField(default=school_socials)
    privacy_pdf = models.FileField(upload_to="privacy_policy/", blank=True, null=True)
    terms_pdf = models.FileField(upload_to="terms_of_use/", blank=True, null=True)

    def __str__(self):
        return f"{self.name}: {self.motto}"


class Owner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="admin")
    _2fa_code = models.CharField(max_length=8, null=True, blank=True)
    _2fa_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}"


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student")
    firstName = models.CharField(max_length=100, verbose_name="First Name", blank=True)
    lastName = models.CharField(max_length=100, verbose_name="Last Name", blank=True)
    middleName = models.CharField(max_length=100, verbose_name="Middle Name", blank=True)
    studentId = models.CharField(max_length=8, unique=True, null=True)
    contactInfo = models.JSONField(default=contact_info)
    parentInfo = models.JSONField(default=parent_info)
    personalInfo = models.JSONField(default=personal_info)
    medicalInfo = models.JSONField(default=medical_info)
    image = models.ImageField(upload_to="students/images/", null=True, blank=True)
    classroom = models.ForeignKey('Classroom', on_delete=models.SET_NULL, null=True, blank=True)
    _2fa_code = models.CharField(max_length=8, null=True, blank=True)
    _2fa_date = models.DateTimeField(null=True, blank=True)
    verificationCode = models.CharField(max_length=6, null=True, blank=True)
    _2fa_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.firstName} {self.middleName} {self.lastName}"

    class Meta:
        ordering = ['firstName']


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="tutor")
    title = models.CharField(max_length=20, blank=True)
    firstName = models.CharField(max_length=100, verbose_name="First Name", null=True)
    lastName = models.CharField(max_length=100, verbose_name="Last Name", null=True)
    middleName = models.CharField(max_length=100, verbose_name="Middle Name", blank=True)
    staffId = models.CharField(max_length=8, unique=True, null=True)
    qualification = models.CharField(max_length=100, null=True)
    resume = models.FileField(upload_to="staff/resume/", null=True, blank=True)
    contactInfo = models.JSONField(default=contact_info)
    image = models.ImageField(upload_to="staff/images/", null=True, blank=True)
    _2fa_code = models.CharField(max_length=8, null=True, blank=True)
    _2fa_date = models.DateTimeField(null=True, blank=True)
    verificationCode = models.CharField(max_length=6, null=True, blank=True)
    _2fa_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} {self.firstName} {self.lastName}"

    class Meta:
        ordering = ['firstName']


class Classroom(models.Model):
    title = models.CharField(max_length=100, default="", blank=True)
    slug = models.SlugField(unique=True)
    level = models.PositiveIntegerField(default=1, unique=True)
    students = models.ManyToManyField('Student', related_name="classrooms", blank=True)
    teacher = models.ForeignKey('Teacher', on_delete=models.SET_NULL, related_name="classroom", null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['level']



"""
def delete(self, *args, **kwargs):
    if self.image:
        self.image.delete()
    super(Category, self).delete(*args, **kwargs)
"""


class Task(models.Model):
    date = models.DateField()

    def __str__(self):
        return f'{self.date}'

    class Meta:
        ordering = ['-date']


class Notification(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="notifications", null=True)
    title = models.CharField(max_length=100)
    details = models.JSONField(default=dict)
    seen = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.title}'


class Log(models.Model):
    log = models.CharField(max_length=200)
    details = models.JSONField(default=dict)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.log}'


WEBHOOK_TYPE = (
    ('customerId', 'customerId'),
    ('Dispute', 'Dispute'),
    ('Refund', 'Refund'),
    ('DVA', 'DVA'),
    ('Invoice', 'Invoice'),
    ('Subscription', 'Subscription'),
    ('Transaction', 'Transaction'),
    ('Transfer', 'Transfer')
)


class Webhook(models.Model):
    type = models.CharField(max_length=50, editable=False)
    reference = models.CharField(max_length=50, editable=False)
    details = models.JSONField(default=dict)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.reference} - {self.type}'
