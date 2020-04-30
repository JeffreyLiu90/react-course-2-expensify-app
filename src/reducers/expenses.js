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

export default expensesReducer;
