// store.js

export function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  
    // Initialize state
  
    return { getState, dispatch, subscribe };
  }
  
