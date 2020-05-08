import {Restaurant} from "classes/restaurant";
import {Rating} from "components/rating";
import React from "react";
import {Link} from "react-router-dom";
import s from './restaurant-list-item.module.scss';


interface OwnProps {
  restaurant: Restaurant
}

export function RestaurantListItem({
                                     restaurant,
                                   }: OwnProps) {
  return <div className={s.item}>
    <div className={s.row}>
      <Link className={s.name} to={'/' + restaurant.id}>{restaurant.name}</Link>
      <div className={s.rating}>
        <Rating restaurant={restaurant} saveOnChange={true} />
      </div>
    </div>
    <div className={s.row}>
      {restaurant.foodTypes.map(ft =>
          <span key={ft.id} className={s.foodType}>{(ft.name || "").toLocaleLowerCase()}</span>)}
    </div>
    <div className={s.row}>
      <span className={s.address}>{restaurant.address}</span>
    </div>
  </div>;
}