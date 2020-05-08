from rest_framework import serializers

from venue.models import FoodType, Restaurant


class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = 'id', 'name'


class RestaurantSerializer(serializers.ModelSerializer):
    food_types = FoodTypeSerializer(many=True)

    class Meta:
        model = Restaurant
        fields = 'id', 'name', 'food_types', 'address', 'rating'


class RestaurantCreateSerializer(RestaurantSerializer):
    food_types = serializers.PrimaryKeyRelatedField(
        queryset=FoodType.objects.all(), many=True
    )


class RestaurantRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = 'rating',