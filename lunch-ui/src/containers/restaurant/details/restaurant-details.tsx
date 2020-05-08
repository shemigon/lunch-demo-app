import {Restaurant} from "classes/restaurant";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {deleteRestaurant} from "store/actions";
import {RootState} from "store/reducers";
import {AppDispatch} from "store/types";
import s from './restaurant-details.module.scss';


interface OwnProps {
  match: {
    params: {
      id: string
    }
  }
}

type Props = OwnProps & RouteComponentProps & ConnectedProps<typeof connector>;

export function RestaurantDetailsComponent({
                                             restaurant,
                                             deleteRestaurant,
                                             history,
                                           }: Props) {
  if (!restaurant) {
    return <div>Loading</div>;
  }

  function onDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Really delete this restaurant?")) {
      deleteRestaurant(restaurant!.id)
          .then(() => history.push('/'))
          .catch(err => alert(err));
    }
  }

  return <div className={s.details}>
    <div className={s.header}>
      <div className={s.part}>
        <Link to="/">Back to list</Link>
      </div>
      <div className={s.part}>
        <h1>{restaurant.name}</h1>
      </div>
      <div className={s.part}>&nbsp;</div>
    </div>
    <div className={s.listWrapper}>
      <dl className={s.list}>
        <dt>Address</dt>
        <dd>{restaurant.address}</dd>
        <dt>Food types</dt>
        <dd>{restaurant.foodTypes.map(ft => ft.name).join(', ')}</dd>
        <dt>Rating</dt>
        <dd data-rating={restaurant.rating}>&nbsp;</dd>
      </dl>
    </div>

    <div className={s.commands}>
      <Link to={"/edit/" + restaurant.id}>Edit</Link>
      <button onClick={onDelete}>Delete</button>
    </div>
  </div>;
}

const connector = connect(
    (state: RootState, ownProps: OwnProps) => ({
      restaurant: (function () {
        const rId = parseInt(ownProps.match.params.id, 10);
        let objs = state.restaurant.data.filter(o => o.id === rId);
        if (objs.length) {
          return new Restaurant(objs[0]);
        }
      }()),
    }),
    {
      deleteRestaurant: (rId: number) => (dispatch: AppDispatch) => dispatch(deleteRestaurant(rId)),
    },
);

export const RestaurantDetails = withRouter(connector(RestaurantDetailsComponent));