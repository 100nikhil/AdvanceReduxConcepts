import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData, fetchRequest } from "./store/cart-slice";

let initial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const itemsInCart = useSelector(state => state.cart.items);
  const cart = useSelector(state => state.cart);
  //const reqStatus = useSelector(state => state.ui.requestStatus);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchRequest());    
  }, [dispatch]);

  useEffect(()=>{
    // const cartHandler = async () => {
    //   const res = await fetch("https://react-backend-api-default-rtdb.firebaseio.com/cart.json", {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   });

    //   if(!res.ok){
    //     throw new Error("Some error occured!");
    //   }

    //   console.log("The request is sent successfully!");
    // }

    if(initial){        //for the very first time when you start the app don't send req
      initial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    //cartHandler().catch((err) => {console.log(err);});   //this line won't run in very first time the app starts

  },[cart, dispatch]);

  return (
    <Layout>
      {showCart && <Cart items={itemsInCart}/>}
      <Products />
    </Layout>
  );
}

export default App;
