import {RestaurantDetails, RestaurantEdit, RestaurantList} from "containers";
import {NotFound} from "containers/not-found";
import {RestaurantNew} from "containers/restaurant/edit/restaurant-new";
import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import {getFoodTypes, loadRestaurants} from "store/actions";
import {RootState} from "store/reducers";
import {AppDispatch} from "store/types";
import s from './app.module.scss';


type Props = ConnectedProps<typeof connector>;

export const AppComponent = ({
                               loadFoodTypes,
                               loadRestaurants,
                             }: Props) => {
  useEffect(() => {
    loadFoodTypes();
    loadRestaurants();
  }, [loadFoodTypes, loadRestaurants]);

  return <div className={s.wrapper}>
    <header className={s.header}>Lunch</header>
    <main className={s.main}>
      <Switch>
        <Route path="/" exact component={RestaurantList} />
        <Route path="/:id(\d+)" component={RestaurantDetails} />
        <Route path="/edit/:id(\d+)" component={RestaurantEdit} />
        <Route path="/new" exact component={RestaurantNew} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
    <footer className={s.footer}>Shemigon 2020</footer>
  </div>;
};
const connector = connect(
    (state: RootState) => ({}),
    {
      loadFoodTypes: () => (dispatch: AppDispatch) => dispatch(getFoodTypes()),
      loadRestaurants: () => (dispatch: AppDispatch) => dispatch(loadRestaurants()),
    },
);

const App = connector(AppComponent);

export default App;