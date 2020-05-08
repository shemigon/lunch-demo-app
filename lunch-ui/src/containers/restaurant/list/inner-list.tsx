import {Restaurant} from "classes/restaurant";
import {RestaurantListItem} from "containers/restaurant/list/restaurant-list-item";
import React from "react";
import s from './inner-list.module.scss';


export function InnerList({
                            restaurants,
                          }: {restaurants: Restaurant[]}) {
  return <ul className={s.list}>
    {restaurants.map((obj: Restaurant) => <li key={obj.id}>
      <RestaurantListItem restaurant={obj} />
    </li>)}
  </ul>;
}