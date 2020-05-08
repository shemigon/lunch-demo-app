import {ApiEditRestaurant, Restaurant} from "classes/restaurant";
import {RestaurantEditForm} from "containers/restaurant/edit/form";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {updateRestaurant} from "store/actions";
import {RootState} from "store/reducers";
import {restaurantSlice} from "store/slices";
import {AppDispatch} from "store/types";


interface OwnProps {
  match: {
    params: {
      id: string
    }
  }

}

type Props = OwnProps & RouteComponentProps & ConnectedProps<typeof connector>;

export function RestaurantNewComponent({
                                         match: {params: {id}},
                                         restaurant,
                                         history,
                                         updateSucceeded,
                                         editRestaurant,
                                         clearUpdateState,
                                       }: Props) {
  const rId = parseInt(id, 10);

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  if (updateSucceeded) {
    navigateBack();
  }

  function navigateBack() {
    clearUpdateState();
    history.push('/' + rId);
  }

  function onSubmit(obj: ApiEditRestaurant) {
    editRestaurant(obj, rId);
  }

  return <RestaurantEditForm restaurant={restaurant} onSubmit={onSubmit} onReset={navigateBack} title="Edit Restaurant" />;
}

const connector = connect(
    (state: RootState, props: OwnProps) => ({
      updateSucceeded: state.restaurant.updateSucceeded,
      restaurant: (function () {
        const rId = parseInt(props.match.params.id, 10);
        if (rId) {
          const apiRestaurants = state.restaurant.data.filter(o => o.id === rId);
          if (apiRestaurants.length) {
            const obj = new Restaurant(apiRestaurants[0]);
            return obj.asEditObject;
          }
        }
      }()),
    }),
    {
      editRestaurant: (obj: ApiEditRestaurant, rId: number) => (dispatch: AppDispatch) => dispatch(updateRestaurant(obj, rId)),
      clearUpdateState: () => (dispatch: AppDispatch) => dispatch(restaurantSlice.actions.setUpdateSucceeded(undefined)),
    },
);

export const RestaurantEdit = connector(withRouter(RestaurantNewComponent));