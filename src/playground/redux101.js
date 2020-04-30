import { createStore } from "redux";

//Action generators return action objects
const incrementCount = ({ incrementby = 1 } = {}) => ({
  type: "INCREMENT",
  incrementby
});

const decrementCount = ({ decrementby = 1 } = {}) => ({
  type: "DECREMENT",
  //decrementby: decrementby
  decrementby
});

const resetCount = () => ({
  type: "RESET"
});

const setCount = ({ count }) => ({
  type: "SET",
  count
});

//Reducers
//1. Reducers are pure functions- depend purely based on input to generate output, cant take things outside of functions variables
//2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementby
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementby
      };
    case "RESET":
      return {
        count: 0
      };
    case "SET":
      return {
        count: action.count
      };

    default:
      return state;
  }
};

//state = current state
//store tracks changing data overtime
//function gets called once we create store
//after every dispatch is called, it changes
const store = createStore(countReducer);

//function gets called every single time store changes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//returns current state object
// console.log(store.getState());

//use Actions to do following- change redux store and below (increment, reset, etc)
//Action is an object that gets sent to store

//incrementing the count
//upper case action type name, conveniton is all CAPS, and _ to separate words
//dispatch allows us to send an action object, and store does smth with this info
//runs the store twice (console.log inside)
// store.dispatch({
//   type: "INCREMENT",
//   incrementby: 5
// });

store.dispatch(
  incrementCount({
    incrementby: 5
  })
);

store.dispatch(incrementCount());

// store.dispatch({
//   type: "INCREMENT"
// });

//reset count to 0
store.dispatch(resetCount());

//decrementment by -1 since there is no decrementby in here

store.dispatch(decrementCount());

//above function if there is a decrement by value -10
store.dispatch(decrementCount({ decrementby: 10 }));

store.dispatch(setCount({ count: -100 }));
