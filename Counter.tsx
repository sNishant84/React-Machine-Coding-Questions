// App.jsx

import React, { useEffect, useState } from 'react';
import { createStore } from './chotaRedux';

// Create the store
export const initialState = { count: 0 };

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
const store = createStore(counterReducer, initialState);

function App() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().count);
    });
    return unsubscribe;
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Custom Redux Counter</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
    </div>
  );
}

export default App;
