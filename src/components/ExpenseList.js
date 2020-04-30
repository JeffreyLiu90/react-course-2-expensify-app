import React from "react";
import ExpenseListIem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expenses";

//connects your component to redux store
import { connect } from "react-redux";

const ExpenseList = props => (
  <div>
    <h1>Expense List </h1>
    {props.expenses.map(expense => {
      return <ExpenseListIem key={expense.id} {...expense} />;
    })}
  </div>
);
//maps store state to component props
const mapStateToProps = state => {
  return {
    //access to info from store
    expenses: getVisibleExpenses(state.expenses, state.filters)
    // filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);
