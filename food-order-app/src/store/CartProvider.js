import {useReducer} from "react";
import {CartContext} from "./CartContext";
import {ADD_ITEM, REMOVE_ITEM} from "./types/Types";

const defaultCartState = {items: [], totalAmount: 0}

const AddItem = (prevState, item) => {
  const updatedTotalAmount = prevState.totalAmount + item.price;
  const existingCartItemIndex = prevState.items.findIndex(itemIter => itemIter.id === item.id);
  const existingCartItem = prevState.items[existingCartItemIndex];

  let updatedItems;

  if (existingCartItem) {
    const updatedItem = {...existingCartItem, amount: existingCartItem.amount + 1}
    updatedItems = [...prevState.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems = prevState.items.concat(item)
  }

  return {items: updatedItems, totalAmount: updatedTotalAmount};
}

const RemoveItem=(prevState,item,itemId)=>{
  const existingCartItemIndex = prevState.items.findIndex(itemIter => itemIter.id === itemId);
  const existingItem = prevState.items[existingCartItemIndex];
  const updatedTotalAmount = Math.abs(prevState.totalAmount - existingItem.price);

  let updatedItems;
  if (existingItem.amount === 1) {
    updatedItems = prevState.items.filter(itemIter => itemIter.id !== itemId)
  } else {
    const updatedItem = {...existingItem, amount: existingItem.amount - 1}
    updatedItems = [...prevState.items]
    updatedItems[existingCartItemIndex] = updatedItem;
  }
  return {items: updatedItems, totalAmount: updatedTotalAmount}
}

const cartReducer = (prevState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return AddItem({...prevState}, action.item)

    case REMOVE_ITEM:
    return RemoveItem({...prevState},action.item,action.itemId)
    default:
      return defaultCartState;
  }
}

const CartProvider = ({children}) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({type: ADD_ITEM, item})
  };
  const removeItemToCartHandler = itemId => {
    dispatchCartAction({type: REMOVE_ITEM, itemId})
  };

  const cartContextHelper = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  };

  return <CartContext.Provider value={cartContextHelper}>{children}</CartContext.Provider>
}

export default CartProvider;