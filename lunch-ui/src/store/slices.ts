import {createSlice} from "@reduxjs/toolkit";
import {ApiRestaurant, FoodType} from "classes/restaurant";
import {RestaurantErrors, UpdateRestaurantAction} from "store/types";


export const foodTypesSlice = createSlice({
  name: "Food Types",
  initialState: [] as FoodType[],
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

const restaurantInitialState = {
  data: [] as ApiRestaurant[],
  ordering: undefined,
  error: undefined as (RestaurantErrors | undefined),
  updateSucceeded: undefined as (boolean | undefined),
  createSucceeded: undefined as (boolean | undefined),
};

export const restaurantSlice = createSlice({
  name: "Restaurant",
  initialState: restaurantInitialState,
  reducers: {
    clear: (state) => ({
      ...state,
      data: [],
      error: undefined,
    }),
    append: (state, action) => {
      const response = action.payload as ApiRestaurant[];
      return {
        ...state,
        data: [...state.data, ...response],
        error: undefined,
      };
    },
    update: (state, action) => {
      const update = action.payload as UpdateRestaurantAction;
      return {
        ...state,
        data: state.data.map(o => {
          if (o.id === update.id) {
            return update.obj;
          }
          return o;
        }),
        error: undefined,
      };
    },
    setUpdateSucceeded: (state, action) => {
      return {
        ...state,
        updateSucceeded: action.payload,
      };
    },
    setCreateSucceeded: (state, action) => {
      return {
        ...state,
        createSucceeded: action.payload,
      };
    },
    remove: (state, action) => {
      const rId: number = action.payload;
      return {
        ...state,
        data: state.data.filter(r => r.id !== rId),
        error: undefined,
      };
    },
    setOrdering: (state, action) => ({
      ...state,
      ordering: action.payload,
    }),
    error: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
});
