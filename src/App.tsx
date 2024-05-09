import React, { useReducer, createContext } from 'react';
import { ActionReducer } from './reducerState/action-reducer';
import { AddTodonAction, addTodoActionHandler } from './reducerState/action/add-todo';
import { State, actionReducer } from './reducerState/reducer/inde';
import { IncrementAction, incrementActionHandler } from './reducerState/action/increment';





// Create a context for the state and dispatch function
const StateContext = createContext<State & { dispatch: React.Dispatch<any> }>({
  count: 0,
  todos: [],
  dispatch: () => {},
});
actionReducer.addAction(new AddTodonAction());
actionReducer.addAction(new IncrementAction());


// Custom hook for serialization and deserialization
const useStorage = (key: string, initialState: State) => {
  // Get the stored state from localStorage
  const getStoredState = (): State | null => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return initialState;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error getting stored state:', error);
      return null;
    }
  };

  // Set the state in localStorage
  const setStoredState = (newState: State) => {
    try {
      localStorage.setItem(key, JSON.stringify(newState));
    } catch (error) {
      console.error('Error setting stored state:', error);
    }
  };

  // Get the state from storage or use the initial state
  const storedState = getStoredState();
  const [state, dispatch] = useReducer(actionReducer.getReducer(), storedState || initialState);

  // Dispatch updates and store the state in localStorage
  React.useEffect(() => {
    setStoredState(state);
  }, [state]); // Only update localStorage when state changes

  return { state, dispatch };
};

// Example usage component
const App = () => {
  const { state, dispatch } = useStorage('my-app-state', { count: 0, todos: [] });

  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch(incrementActionHandler())}>
          Increment
        </button>
        <ul>
          {state.todos.map((todo:any) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add todo"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(addTodoActionHandler(event.target.value));
              event.target.value = '';
            }
          }}
        />
      </div>
    </StateContext.Provider>
  );
};

export default App;
