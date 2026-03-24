from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ManyToManyField(User, blank=True, related_name='suggested_workouts')

class Leaderboard(models.Model):
    team = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='leaderboard')
    score = models.IntegerField(default=0)
