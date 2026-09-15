// src/components/ProductList.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const products = [
  { id: 1, name: 'Apple', price: 1.2 },
  { id: 2, name: 'Banana', price: 0.8 },
  { id: 3, name: 'Orange', price: 1.5 },
];

const ProductList = () => {
  const { dispatch } = useContext(CartContext);

  return (
    <div>
      <h2>Products</h2>
      <div className="products">
        {products.map(p => (
          <div key={p.id} className="product">
            <span>{p.name} - ${p.price.toFixed(2)}</span>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                <button onClick={() => dispatch({ type: 'INCREMENT', payload: item.id })}>+</button>
                <button onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}>-</button>
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Checkout</button>
        </>
      )}
    </div>
  );
};

const MainCart=()=> <>
       <ProductList />
       <Cart />
       </>

export default MainCart;


