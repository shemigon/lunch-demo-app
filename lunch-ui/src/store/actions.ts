import {Action, ThunkAction} from "@reduxjs/toolkit";
import {ApiEditRestaurant} from "classes/restaurant";
import {
  createRestaurantRequest,
  deleteRestaurantRequest,
  fetchFoodTypes,
  loadRestaurantsRequest,
  updateRestaurantRequest,
} from "network/restaurant";
import {RootState} from "store/reducers";
import {foodTypesSlice, restaurantSlice} from "store/slices";
import {UpdateRestaurantAction} from "store/types";


type PromiseAction<PromiseReturnType = void> = ThunkAction<Promise<PromiseReturnType>, RootState, unknown, Action<string>>;

export function createRestaurant(obj: ApiEditRestaurant): PromiseAction {
  return function (dispatch, getState) {
    dispatch(restaurantSlice.actions.setCreateSucceeded(undefined));
    return createRestaurantRequest(obj)(getState())
        .then(restaurant => {
          dispatch(restaurantSlice.actions.append([restaurant]));
          dispatch(restaurantSlice.actions.setCreateSucceeded(true));
        })
        .catch(error => {
          dispatch(restaurantSlice.actions.error(error));
          dispatch(restaurantSlice.actions.setCreateSucceeded(false));
        });
  };
}

export function updateRestaurant(obj: Partial<ApiEditRestaurant>, rId: number): PromiseAction {
  return function (dispatch, getState) {
    dispatch(restaurantSlice.actions.setUpdateSucceeded(undefined));
    return updateRestaurantRequest(obj, rId)(getState())
        .then(restaurant => {
          dispatch(restaurantSlice.actions.update({
            id: rId,
            obj: restaurant,
          } as UpdateRestaurantAction));
          dispatch(restaurantSlice.actions.setUpdateSucceeded(true));
        })
        .catch(error => {
          dispatch(restaurantSlice.actions.error(error));
          dispatch(restaurantSlice.actions.setUpdateSucceeded(false));
        });
  };
}

export function loadRestaurants(ordering?: string): PromiseAction {
  return function (dispatch, getState) {
    return loadRestaurantsRequest(ordering)(getState())
        .then(restaurants => {
          dispatch(restaurantSlice.actions.clear());
          dispatch(restaurantSlice.actions.append(restaurants));
          dispatch(restaurantSlice.actions.setOrdering(ordering));
        })
        .catch(error => {
          dispatch(restaurantSlice.actions.error(error));
        });
  };
}

export function deleteRestaurant(rId: number): PromiseAction {
  return function (dispatch, getState) {
    return deleteRestaurantRequest(rId)(getState())
        .then(rId => {
          dispatch(restaurantSlice.actions.remove(rId));
        })
        .catch(error => {
          dispatch(restaurantSlice.actions.error(error));
        });
  };
}

export const getFoodTypes = (): PromiseAction =>
    (dispatch, getState) => fetchFoodTypes()(getState())
        .then(foodTypes => {
          dispatch(foodTypesSlice.actions.set(foodTypes));
        })
        .catch(error => {
          console.log(error);
        });
