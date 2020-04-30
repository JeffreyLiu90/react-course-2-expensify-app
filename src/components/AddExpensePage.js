import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        //{description: "hello", amount: 1200, createdAt: 1588141805112, note: ""}
        // console.log("expense:", expense);

        props.dispatch(addExpense(expense));
        //this will redirect
        props.history.push("/");
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
