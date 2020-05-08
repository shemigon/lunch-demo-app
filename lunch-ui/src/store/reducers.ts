import {combineReducers} from "redux";
import {foodTypesSlice, restaurantSlice} from "./slices";


export const rootReducer = combineReducers({
  restaurant: restaurantSlice.reducer,
  foodTypes: foodTypesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
