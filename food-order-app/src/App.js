import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartVisible, setCartVisibility] = useState(false);

  const showCartHandler = () => setCartVisibility(true);
  const hideCartHandler = () => setCartVisibility(false);

  return (
    <CartProvider>
      {cartVisible && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
