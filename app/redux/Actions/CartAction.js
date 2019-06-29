import * as KeyConstants from '../KeyConstants';

export const addToCart = (item) => {
  return {
    type: KeyConstants.default.ADD_TO_CART,
    payload: item
  }
}

export const removeFromCart = (item) => {
  return {
    type: KeyConstants.default.REMOVE_FROM_CART,
    payload: item
  }
}