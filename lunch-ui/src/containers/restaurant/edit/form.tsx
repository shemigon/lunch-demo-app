import {ApiEditRestaurant} from "classes/restaurant";
import React, {FormEvent, useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {RootState} from "store/reducers";
import {RestaurantErrors} from "store/types";
import s from './restaurant-edit.module.scss';


interface OwnProps {
  restaurant?: ApiEditRestaurant
  onSubmit: (obj: ApiEditRestaurant) => void
  onReset?: () => void
  title: string
}

type Props = OwnProps & RouteComponentProps & ConnectedProps<typeof connector>;

export function RestaurantEditFormComponent({
                                              restaurant,
                                              onSubmit,
                                              onReset,
                                              title,
                                              foodTypes,
                                              errors,
                                            }: Props) {
  if (!restaurant) {
    restaurant = {
      name: "",
      food_types: [],
      rating: 0,
      address: "",
    };
  }
  const [currentObj, setCurrentObj] = useState(restaurant);
  const [error, setError] = useState<RestaurantErrors>();

  useEffect(() => {
    setError(errors);
  }, [errors]);

  function isValid(): boolean {
    let errors: RestaurantErrors = {};
    if (!currentObj.name?.length) {
      errors.name = "Name cannot be empty.";
    }
    if (!currentObj.address?.length) {
      errors.name = "Address cannot be empty.";
    }
    const rating = currentObj.rating ?? 0;
    if (rating < 0 || rating > 5) {
      errors.name = "Rating must be between 0 and 5.";
    }
    if (!currentObj.food_types.length) {
      errors.food_types = "At least one food type required.";
    }
    setError(errors);
    return !Object.keys(errors).length;
  }

  function save(e: FormEvent) {
    e.preventDefault();
    if (isValid()) {
      onSubmit(currentObj);
    }
  }

  function setValue(props: Partial<ApiEditRestaurant>) {
    setCurrentObj({...currentObj, ...props});
  }

  return <div className={s.details}>
    <div className={s.header}>
      <h1>{title}</h1>
    </div>

    <div className={s.formWrapper}>
      <div className={s.error}>{error?.detail}</div>

      <div className={s.form}>
        <form onSubmit={(e) => {save(e);}} onReset={onReset}>
          <div className={s.formRow}>
            <div className={s.error}>{error?.name}</div>
            <label>
              Name
              <input
                  type="text"
                  value={currentObj.name}
                  onChange={(e) => {setValue({name: e.target.value});}}
              />
            </label>
          </div>
          <div className={s.formRow}>
            <div>{error?.address}</div>
            <label>
              Address
              <input
                  type="text"
                  value={currentObj.address}
                  onChange={(e) => {setValue({address: e.target.value});}}
              />
            </label>
          </div>
          <div className={s.formRow}>
            <div>{error?.food_types}</div>
            <label>
              Food types
              <select
                  value={currentObj.food_types?.map(o => o.toString() ?? 0)}
                  multiple={true}
                  onChange={(e) => {setValue({food_types: Array.from(e.target.options).filter(o => o.selected).map(o => parseInt(o.value, 10))});}}
              >
                {foodTypes.map((ft) => <option key={ft.id} value={ft.id}>
                  {ft.name}
                </option>)}
              </select>
            </label>
          </div>
          <div className={s.formRow}>
            <div>{error?.rating}</div>
            <label>
              Rating
              <select
                  value={currentObj.rating}
                  onChange={(e) => {setValue({rating: parseInt(e.target.value, 10)});}}
              >
                {Array.from(Array(6).keys()).map((i) => <option
                    key={i}
                    value={i}
                >
                  {i ? i : ""}
                </option>)}
              </select>
            </label>
          </div>
          <div className={s.commands}>
            <button className={s.default} type="submit">Save</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>;
}

const connector = connect(
    (state: RootState, props: OwnProps) => ({
      foodTypes: state.foodTypes,
      errors: state.restaurant.error,
    }),
);

export const RestaurantEditForm = connector(withRouter(RestaurantEditFormComponent));