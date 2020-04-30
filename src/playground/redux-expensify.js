import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//Add Expense action generator
//generate unique id - npm library - uuid

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//Remove Expense
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

//Edit Expense

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

//Set Text Filter

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});
//Sort by Date
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

//Sort by Amount
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

//Set Start Date
const setStartDate = num => ({
  type: "SET_START_DATE",
  num
});

//Set End Date

const setEndDate = num => ({
  type: "SET_END_DATE",
  num
});

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      // return state.concat(action.expense);
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      //return a new array with filter
      //if return true, item will kept in array, false it will be removed
      //filter a new array that does not have the action id
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      //go through all the expenses, find the id that matches, return the whole expense, and then update the amount  i.e. ...expense, amount:500
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

//Filters Reducers

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SET_START_DATE":
      return { ...state, startDate: action.num };
    case "SET_END_DATE":
      return { ...state, endDate: action.num };
    default: {
      return state;
    }
  }
};
//timestamps counts in milliseconds
//positive or negative integer value, goes backward in time
//time stamp 0 = January 1st, 1970 (unix epoch) - starting point for all our timestamps

//Get Visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        //1 is true and -1 is false
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        //if the b amount is greater than a amount, then sort by B first, else vice versa
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

//Store Creation
//easier to maintain state for different reducers
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

//to track state changes
//return the specific reducers

store.subscribe(() => {
  const state = store.getState();
  //comparing expenses and filters reducers
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

//this implicitly already creates a new store
const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: 1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter("e"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//start date = dec 5, 2019
//anything above this number means it was created after this date, so you can filter through it and find a matcg
// store.dispatch(setStartDate(0));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(1001));

const demoState = {
  expenses: [
    {
      id: "someid",
      description: "Jan rent",
      note: "This was final payment for that address",
      amount: 54500,
      createdAt: 1000
    }
  ],
  filters: {
    text: "rent",
    sortyBy: "amount", //date or amount
    startDate: 125,
    endDate: 999
  }
};
