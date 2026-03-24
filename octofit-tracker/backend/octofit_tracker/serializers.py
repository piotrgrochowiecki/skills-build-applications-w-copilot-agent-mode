from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard
from bson import ObjectId


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value) if value else None

    def to_internal_value(self, data):
        return ObjectId(data) if data else None


class BaseSerializer(serializers.ModelSerializer):
    """Convert any residual ObjectId values to strings so DRF's JSON renderer
    can handle them without raising a TypeError."""

    def to_representation(self, instance):
        data = super().to_representation(instance)
        for key, value in data.items():
            if isinstance(value, ObjectId):
                data[key] = str(value)
            elif isinstance(value, list):
                data[key] = [str(v) if isinstance(v, ObjectId) else v for v in value]
        return data


class TeamSerializer(BaseSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class UserSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ActivitySerializer(BaseSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class WorkoutSerializer(BaseSerializer):
    class Meta:
        model = Workout
        fields = '__all__'


class LeaderboardSerializer(BaseSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'

