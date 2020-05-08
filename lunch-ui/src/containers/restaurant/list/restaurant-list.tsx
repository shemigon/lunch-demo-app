import {Restaurant} from "classes/restaurant";
import {Ordering} from "components/ordering";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "store/reducers";
import {InnerList} from "./inner-list";
import {NoData} from "./no-data";
import s from './restaurant-list.module.scss';


type Props = ConnectedProps<typeof connector>;

export function RestaurantListComponent({
                                          restaurants,
                                        }: Props) {
  return <div className={s.wrapper}>
    <h1 className={s.title}>Restaurants</h1>
    <div className={s.header}>
      <span>
        Sort: <Ordering />
      </span>
      <span>
        <Link to='/new'>New</Link>
      </span>
    </div>

    <div className={s.list}>
      {restaurants.length ?
          <InnerList restaurants={restaurants} /> :
          <NoData />}
    </div>
  </div>;
}

const connector = connect(
    (state: RootState) => ({
      restaurants: state.restaurant.data.map(o => new Restaurant(o)),
    }),
);

export const RestaurantList = connector(RestaurantListComponent);