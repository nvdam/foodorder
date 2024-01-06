import { Suspense, lazy, useState } from 'react';

import Header from './components/Layout/Header';
// import Meals from './components/Meals/Meals';
// import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Orders from './components/orders/orders';

function App() {
  const LazyCart = lazy(() => import('./components/Cart/Cart'));
  const LazyMeals = lazy(() => import('./components/Meals/Meals'));

  const [cartIsShown, setCartIsShown] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
const toogleOrders = () => {
  setShowOrders(prev => !prev);
}

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Suspense><LazyCart onClose={hideCartHandler} /></Suspense>}
      <Header onToogleHandler={toogleOrders} onShowCart={showCartHandler} />
      {!showOrders && <main>
        <Suspense fallback={'loading...'}><LazyMeals /></Suspense>
      </main>}
      {showOrders && <Orders />}
    </CartProvider>
  );
}

export default App;
