import {DateTime} from "classes/datetime";


export interface FoodType {
  id: number
  name: string
}

export interface ApiEditRestaurant {
  name: string
  food_types: number[]
  address: string
  rating: number
}

export interface ApiRestaurant {
  id: number
  name: string
  food_types: FoodType[]
  address: string
  rating: number
  created_date: string
  modified_date: string
}

export class Restaurant {
  id!: number;
  name!: string;
  foodTypes: FoodType[];
  address!: string;
  rating!: number;
  created_date: DateTime;
  modified_date: DateTime;

  constructor(props: ApiRestaurant) {
    Object.assign(this, props);
    this.foodTypes = props.food_types;
    this.created_date = new DateTime(props.created_date);
    this.modified_date = new DateTime(props.modified_date);
  }

  get asEditObject(): ApiEditRestaurant {
    return {
      name: this.name,
      address: this.address,
      rating: this.rating,
      food_types: this.foodTypes.map(o => o.id),
    };
  };
}