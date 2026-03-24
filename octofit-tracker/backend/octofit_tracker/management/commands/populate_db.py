from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create Users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
        ]

        # Create Activities
        Activity.objects.create(user=users[0], type='run', duration=30, date='2023-01-01')
        Activity.objects.create(user=users[1], type='cycle', duration=45, date='2023-01-02')
        Activity.objects.create(user=users[2], type='swim', duration=60, date='2023-01-03')
        Activity.objects.create(user=users[3], type='yoga', duration=20, date='2023-01-04')

        # Create Workouts
        w1 = Workout.objects.create(name='Pushups', description='Upper body strength')
        w2 = Workout.objects.create(name='Sprints', description='Speed training')
        w1.suggested_for.set(users)
        w2.suggested_for.set(users)

        # Create Leaderboards
        Leaderboard.objects.create(team=marvel, score=100)
        Leaderboard.objects.create(team=dc, score=90)


        # Ensure unique index on email using PyMongo
        from pymongo import MongoClient
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db.user.create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
