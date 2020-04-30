//timestamps counts in milliseconds
//positive or negative integer value, goes backward in time
//time stamp 0 = January 1st, 1970 (unix epoch) - starting point for all our timestamps

//Get visible expenses on dashboard

import moment from "moment";

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        //if the b amount is greater than a amount, then sort by B first, else vice versa
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        //if the b amount is greater than a amount, then sort by B first, else vice versa
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
