from rest_framework import filters, generics

from api.mixins import InOutSerializer
from api.restaurant import serializers
from venue.models import FoodType, Restaurant


class RestaurantListView(InOutSerializer, generics.ListCreateAPIView):
    filter_backends = filters.OrderingFilter,
    output_serializer_class = serializers.RestaurantSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.RestaurantCreateSerializer
        return serializers.RestaurantSerializer

    def get_queryset(self):
        return Restaurant.objects.prefetch_related('food_types')


class RestaurantEditView(InOutSerializer,
                         generics.RetrieveUpdateDestroyAPIView):
    output_serializer_class = serializers.RestaurantSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.RestaurantSerializer
        return serializers.RestaurantCreateSerializer

    queryset = Restaurant.objects.all()


class RestaurantrateView(generics.CreateAPIView):
    serializer_class = serializers.RestaurantRateSerializer
    queryset = Restaurant.objects.all()

    def perform_create(self, serializer):
        obj: Restaurant = self.get_object()
        obj.rating = serializer.data['rating']
        obj.save(update_fields=['rating'])


class FoodTypesView(generics.ListAPIView):
    serializer_class = serializers.FoodTypeSerializer
    queryset = FoodType.objects.all()
