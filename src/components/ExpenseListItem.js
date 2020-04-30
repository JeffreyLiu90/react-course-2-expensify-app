import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
);

export default ExpenseListItem;

// {props.state.expenses.map(
//   expense => expense.description,
//   expense.amount,
//   expense.createdAt
// )}

// <div>
// <h1>Expense List </h1>
// {props.expenses.map(expense => {
//   return <ExpenseListIem {...expense} />;
// })}
// </div>
