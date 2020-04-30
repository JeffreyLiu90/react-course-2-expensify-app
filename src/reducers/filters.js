import moment from "moment";

//Filters Reducers

//beginning of month and end as default for filters reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
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

export default filtersReducer;
