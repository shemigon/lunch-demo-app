import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {loadRestaurants} from "store/actions";
import {RootState} from "store/reducers";
import {AppDispatch} from "store/types";
import s from './ordering.module.scss';


type Props = ConnectedProps<typeof connector>;

const OrderingComponent = ({
                             currentOrdering,
                             loadRestaurants,
                           }: Props) => {
  return <select className={s.select} value={currentOrdering} onChange={(e) => loadRestaurants(e.target.value)}>
    <option value="">Default</option>
    <option value="rating">Rating ASC</option>
    <option value="-rating">Rating DESC</option>
    <option value="name">Name ASC</option>
    <option value="-name">Name DESC</option>
  </select>;
};

const connector = connect(
    (state: RootState) => ({
      currentOrdering: state.restaurant.ordering,
    }),
    {
      loadRestaurants: (ordering?: string) => (dispatch: AppDispatch) => dispatch(loadRestaurants(ordering)),
    },
);

export const Ordering = connector(OrderingComponent);