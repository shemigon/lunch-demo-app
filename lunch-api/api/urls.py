from django.urls import include, path

app_name = 'api'

urlpatterns = [
    path('restaurants/', include('api.restaurant.urls'), name='restaurant'),
]
