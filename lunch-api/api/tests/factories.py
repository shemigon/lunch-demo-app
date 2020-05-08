from random import randint

from factory import DjangoModelFactory, Faker, post_generation, Sequence

from venue.models import FoodType, Restaurant


class FoodTypeFactory(DjangoModelFactory):
    class Meta:
        model = FoodType

    name = Sequence(lambda n: ['American', 'Ukrainian', 'Latin'][n % 3])


class RestaurantFactory(DjangoModelFactory):
    class Meta:
        model = Restaurant

    name = Faker('company')
    address = Faker('address')
    rating = Faker('pyint', min_value=0, max_value=5)

    @post_generation
    def food_types(self, create, extracted, **kwargs):
        if create:
            n = randint(1, 3)
            extracted = FoodType.objects.all()[:n]
            if not extracted:
                extracted = FoodTypeFactory.create_batch(3)

        if extracted:
            # A list of groups were passed in, use them
            for group in extracted:
                self.food_types.add(group)
