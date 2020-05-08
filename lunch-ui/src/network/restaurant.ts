import {ApiEditRestaurant, ApiRestaurant, FoodType} from "classes/restaurant";
import {requestWrapper} from "network/functional";
import {request} from "network/request";


export const fetchFoodTypes = () => requestWrapper(
    (resolve, reject) =>
        request({
          method: 'GET',
          path: 'restaurants/food-types',
        })
            .then(({data}) => resolve(data as FoodType[]))
            .catch(err => reject(err)),
);

export const loadRestaurantsRequest = (ordering?: string) =>
    requestWrapper(
        (resolve, reject) =>
            request({
              method: 'GET',
              path: 'restaurants',
              params: {
                ordering: ordering,
              },
            })
                .then(({data}) => {
                  return resolve(data as ApiRestaurant[]);
                })
                .catch(err => reject(err)),
    );

export const createRestaurantRequest = (obj: ApiEditRestaurant) =>
    requestWrapper(
        (resolve, reject) =>
            request({
              method: 'POST',
              path: 'restaurants',
              body: obj,
            })
                .then(({data}) => {
                  return resolve(data as ApiRestaurant);
                })
                .catch(err => reject(err)),
    );

export const updateRestaurantRequest = (obj: Partial<ApiEditRestaurant>, rId: number) =>
    requestWrapper(
        (resolve, reject) =>
            request({
              method: 'PATCH',
              path: 'restaurants/' + rId,
              body: obj,
            })
                .then(({data}) => {
                  resolve(data as ApiRestaurant);
                })
                .catch(err => reject(err)),
    );

export const deleteRestaurantRequest = (rId: number) =>
    requestWrapper(
        (resolve, reject) =>
            request({
              method: 'DELETE',
              path: 'restaurants/' + rId,
            })
                .then(() => {
                  resolve(rId);
                })
                .catch(err => reject(err)),
    );
