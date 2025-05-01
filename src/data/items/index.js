
import { mainDishes } from './mainDishes';
import { sandwichesAndWraps } from './sandwiches';
import { salads } from './salads';
import { snacks } from './snacks';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const menuItems = [
  ...mainDishes,
  ...sandwichesAndWraps,
  ...salads,
  ...snacks,
  ...desserts,
  ...beverages,
];
