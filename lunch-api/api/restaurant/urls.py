from django.urls import path

from . import views

app_name = 'restaurant'

urlpatterns = [
    path('', views.RestaurantListView.as_view(), name='list-create'),
    path('<int:pk>/', views.RestaurantEditView.as_view(), name='edit-delete'),
    path('<int:pk>/rate/', views.RestaurantrateView.as_view(), name='rate'),

    path('food-types/', views.FoodTypesView.as_view(), name='food-types'),
]
