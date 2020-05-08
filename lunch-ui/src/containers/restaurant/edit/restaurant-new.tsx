import {ApiEditRestaurant} from "classes/restaurant";
import {RestaurantEditForm} from "containers/restaurant/edit/form";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {createRestaurant} from "store/actions";
import {RootState} from "store/reducers";
import {restaurantSlice} from "store/slices";
import {AppDispatch} from "store/types";


interface OwnProps {
}

type Props = OwnProps & RouteComponentProps & ConnectedProps<typeof connector>;

export function RestaurantNewComponent({
                                         history,
                                         createSucceeded,
                                         createRestaurant,
                                         clearCreateState,
                                       }: Props) {

  if (createSucceeded) {
    navigateBack();
  }

  function navigateBack() {
    clearCreateState();
    history.push('/');
  }

  function onSubmit(obj: ApiEditRestaurant) {
    createRestaurant(obj);
  }

  return <RestaurantEditForm onSubmit={onSubmit} onReset={navigateBack} title="New Restaurant" />;
}

const connector = connect(
    (state: RootState, props: OwnProps) => ({
      createSucceeded: state.restaurant.createSucceeded,
    }),
    {
      createRestaurant: (obj: ApiEditRestaurant) => (dispatch: AppDispatch) => dispatch(createRestaurant(obj)),
      clearCreateState: () => (dispatch: AppDispatch) => dispatch(restaurantSlice.actions.setCreateSucceeded(undefined)),
    },
);

export const RestaurantNew = connector(withRouter(RestaurantNewComponent));