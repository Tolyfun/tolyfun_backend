from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['name', 'motto', 'primary_email', 'secondary_email', 'primary_phone',
                  'secondary_phone', 'privacy_policy', 'terms_of_use', 'about', 'logo',
                  'icon', 'privacy_pdf', 'terms_pdf', "socials"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['firstName', 'middleName', 'lastName', 'studentId', 'image', 'classroom']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['firstName', 'middleName', 'lastName', 'studentId', 'contactInfo', 'parentInfo',
                  '_2fa_enabled', 'personalInfo', 'medicalInfo', 'classroom', 'image']


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['title', 'firstName', 'middleName', 'lastName', 'staffId', 'qualification', 'image']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['title', 'firstName', 'middleName', 'lastName', 'staffId', 'qualification', 'image', 'resume',
                  'contactInfo', '_2fa_enabled']


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['title', 'slug', 'level', 'teacher']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'details', 'created']


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['id', 'log', 'details', 'created']


class WebhookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webhook
        fields = ['id', 'type', 'reference', 'details', 'created']
