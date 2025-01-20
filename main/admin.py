from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(School)
admin.site.register(Owner)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['studentId', 'user',  'firstName', 'lastName', 'classroom']
    list_filter = ['classroom']
    search_fields = ['studentId']
    list_per_page = 20


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['user', 'staffId', 'firstName', 'lastName']
    search_fields = ['staffId']
    list_per_page = 20


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ['title', 'level', 'teacher']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ["title", "slug"]
    list_per_page = 20


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'seen', 'created']
    list_per_page = 20


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['date']
    list_per_page = 20


@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ['log', 'created']
    list_per_page = 50


admin.site.register(Webhook)
