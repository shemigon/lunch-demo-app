from typing import List

from django.test import TestCase
from rest_framework.reverse import reverse

from api.tests.factories import FoodTypeFactory, RestaurantFactory
from venue.models import Restaurant


class RestaurantTestCase(TestCase):
    def setUp(self):
        self.food_types = FoodTypeFactory.create_batch(3)

    def test_create(self):
        url = reverse('api:restaurant:list-create')
        data = {
            'name': 'Restaurant',
            'food_types': [ft.id for ft in self.food_types[:2]],
            'address': 'address',
            'rating': 5,
        }
        response = self.client.post(url, data, 'application/json')
        self.assertEqual(response.status_code, 201, response.content)
        resp = response.json()

        self.assertEqual(resp['id'], 1)
        for attr in data.keys():
            if attr == 'food_types':
                self.assertEqual(data[attr], [i['id'] for i in resp[attr]])
                continue
            self.assertEqual(data[attr], resp[attr])

    def test_list(self):
        restaurants: List[Restaurant] = RestaurantFactory.create_batch(3)
        url = reverse('api:restaurant:list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()
        self.assertEqual(len(data), 3)

        for i, restaurant in enumerate(data):
            # this will work because no explicit sorting in place
            self.assertEqual(restaurant['name'], restaurants[i].name)
            self.assertEqual(
                restaurant['food_types'],
                list(restaurants[i].food_types.values('id', 'name'))
            )
            self.assertEqual(restaurant['address'], restaurants[i].address)
            self.assertEqual(restaurant['rating'], restaurants[i].rating)

    def test_list_ordering(self):
        restaurants: List[Restaurant] = RestaurantFactory.create_batch(5)
        url = reverse('api:restaurant:list-create')
        response = self.client.get(f'{url}?ordering=-rating')
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()
        self.assertEqual(
            [r['rating'] for r in data],
            sorted((r.rating for r in restaurants), reverse=True)
        )

    def test_details(self):
        restaurant: Restaurant = RestaurantFactory()
        url = reverse('api:restaurant:edit-delete', kwargs={
            'pk': restaurant.id
        })
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()

        self.assertEqual(data['name'], restaurant.name)
        self.assertEqual(
            data['food_types'],
            list(restaurant.food_types.values('id', 'name'))
        )
        self.assertEqual(data['address'], restaurant.address)
        self.assertEqual(data['rating'], restaurant.rating)

    def test_edit(self):
        restaurant: Restaurant = RestaurantFactory()
        url = reverse('api:restaurant:edit-delete', kwargs={
            'pk': restaurant.id
        })
        new_name = restaurant.name + ' (new)'
        response = self.client.put(url, {
            'name': new_name,
            'food_types': [ft.id for ft in restaurant.food_types.all()],
            'address': restaurant.address,
            'rating': restaurant.rating,
        }
                                   , 'application/json')
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()

        self.assertEqual(data['name'], new_name)
        restaurant.refresh_from_db()
        self.assertEqual(restaurant.name, new_name)

    def test_edit_partial(self):
        restaurant: Restaurant = RestaurantFactory()
        url = reverse('api:restaurant:edit-delete', kwargs={
            'pk': restaurant.id
        })
        new_name = restaurant.name + ' (new)'
        response = self.client.patch(url, {
            'name': new_name
        }, 'application/json')
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()

        self.assertEqual(data['name'], new_name)
        restaurant.refresh_from_db()
        self.assertEqual(restaurant.name, new_name)

    def test_delete(self):
        restaurant: Restaurant = RestaurantFactory()
        url = reverse('api:restaurant:edit-delete', kwargs={
            'pk': restaurant.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204, response.content)

        with self.assertRaises(Restaurant.DoesNotExist):
            restaurant.refresh_from_db()

    def test_rate(self):
        restaurant: Restaurant = RestaurantFactory(rating=0)
        url = reverse('api:restaurant:rate', kwargs={
            'pk': restaurant.id
        })
        new_rating = 5
        self.assertEqual(restaurant.rating, 0)
        response = self.client.post(url, {
            'rating': new_rating
        })
        self.assertEqual(response.status_code, 201, response.content)
        data = response.json()
        self.assertEqual(data['rating'], new_rating)
        restaurant.refresh_from_db()
        self.assertEqual(restaurant.rating, new_rating)
