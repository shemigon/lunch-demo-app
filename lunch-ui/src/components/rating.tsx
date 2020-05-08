import {Restaurant} from "classes/restaurant";
import React, {useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {updateRestaurant} from "store/actions";
import {RootState} from "store/reducers";
import {restaurantSlice} from "store/slices";
import {AppDispatch} from "store/types";
import s from './rating.module.scss';


interface OwnProps {
  restaurant: Restaurant,
  saveOnChange?: boolean
}

type Props = OwnProps & ConnectedProps<typeof connector>

const RatingComponent = ({
                           restaurant,
                           saveOnChange = false,
                           errors,
                           updateSucceeded,
                           saveRating,
                           clearUpdateState,
                         }: Props) => {
  const [newRating, setNewRating] = useState(restaurant.rating);

  if (updateSucceeded) {
    clearUpdateState();
  }

  function onChange(newRating: number) {
    setNewRating(newRating);
    if (saveOnChange) {
      saveRating(restaurant.id, newRating);
    }
  }

  return <div className={s.rating}>
    <div>{errors?.rating}</div>
    <div><select
        value={newRating}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
    >
      {Array.from(Array(6).keys()).map((i) => <option
          key={i}
          value={i}
      >
        {i ? i : ""}
      </option>)}
    </select></div>
  </div>;
};
const connector = connect(
    (state: RootState, props: OwnProps) => ({
      errors: state.restaurant.error,
      updateSucceeded: state.restaurant.updateSucceeded,
    }),
    {
      saveRating: (rId: number, rating: number) => (dispatch: AppDispatch) => dispatch(updateRestaurant({
        rating: rating,
      }, rId)),
      clearUpdateState: () => (dispatch: AppDispatch) => dispatch(restaurantSlice.actions.setUpdateSucceeded(undefined)),
    },
);

export const Rating = connector(RatingComponent);