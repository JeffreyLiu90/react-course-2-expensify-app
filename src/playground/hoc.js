//Higher Order Component (HOC) - a react component (hoc) that renders another component (regular, could be 5-6 of them)
//Reuse code
//Render hijacking
//Prop manipulation
//Abstract State

import React from "react";
import ReactDOM from "react-dom";
import { removeExpense } from "../actions/filters";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

//{...props} = the props.info, could be written as info={props.info}

//this function returns the HOC, Info is the reg component
const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please Log in!</p>
      )}
    </div>
  );
};

//

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="There are the details" />,
  document.getElementById("app")
);

/////V2
// const requireAuthentication = WrappedComponent => {
//   return props => (
//     <div>
//       {props.isAuthenticated && <WrappedComponent {...props} />}

//       {!props.isAuthenticated && <p>Please log in!</p>}
//     </div>
//   );
// };
