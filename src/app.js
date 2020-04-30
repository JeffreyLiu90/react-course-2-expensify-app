import React from "react";
import ReactDOM from "react-dom";

//provider component allow us to provide the store to all of the components that make up our application
//dont need to manually pass the store around
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibileExpenses from "./selectors/expenses";
import configureStore from "./store/configureStore";
import "./styles/styles.scss";
import "normalize.css/normalize.css";

//create store with the reducers- the file
const store = configureStore();

store.dispatch(
  addExpense({
    description: "Water Bill",
    amount: 40,
    createdAt: 1000
  })
);

store.dispatch(
  addExpense({
    description: "Rent",
    amount: 90,
    createdAt: 1000
  })
);

store.dispatch(
  addExpense({
    description: "Gas Bill",
    amount: 70,
    createdAt: -1000
  })
);

// setTimeout(() => {
//   store.dispatch(setTextFilter("bill"));
// }, 3000);

//gets the states - console.log(store.getState()) ==> {expenses: Array(2), filters: {…}}
// expenses: (2) [{…}, {…}]
// filters: {text: "bill", sortBy: "date", startDate: undefined, endDate: undefined}
// __proto__: Object
const state = store.getState();
const visibleExpenses = getVisibileExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

console.log(state);

//create components that grab info from store
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
