import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {ApiEditRestaurant, ApiRestaurant} from "classes/restaurant";
import {RootState} from "store/reducers";


export type RestaurantErrors = {
  [P in keyof ApiEditRestaurant]?: string
} & {detail?: string};

export interface UpdateRestaurantAction {
  id: number
  obj: ApiRestaurant
}

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;