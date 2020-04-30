import React from "react";
import { NavLink } from "react-router-dom";

//ActiveClassName = allow us to provide a class- only applied to the link when we are on that page
//exact needs to be true = so Dashboard link is not always bolded
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>

    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

export default Header;
