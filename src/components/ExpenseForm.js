import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
// const date = new Date()
// console.log("now: ", now);
// look at last object to find all the functionalities of moment
// console.log("now: ", now.format()); - current date and time
// check out display section
const now = moment();
console.log("now: ", now.format("MMM Do, YYYY"));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  };

  onNotechange = e => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    //= ^\d means to force it to start with a digit
    //= \d* - to register all the remaining digits, not just the first one
    //= (\.\d{0,2}) - optional group, match the . character and digit between 0-2 digits
    // = ? at the group is an optional
    // = $/ dollar sign means expression ends
    //clear value ||

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  //if statement prevents clearing date
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  //Error handling
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount!"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        //keeps decimal places versis parseInt, *100 because in pennies
        amount: parseFloat(this.state.amount, 10) * 100,
        //regular number rep value
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />

          <SingleDatePicker
            //where to start- the date - today
            date={this.state.createdAt}
            // function we create called with moment instance when someone picks a date in calendat
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />

          <textarea
            placeholder="Add a note for your expense(optional)"
            value={this.state.note}
            onChange={this.onNotechange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
