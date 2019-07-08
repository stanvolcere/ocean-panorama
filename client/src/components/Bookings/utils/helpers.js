import moment from "moment";

export const displayDate = date => {
  const displayDate = moment(date);
  return displayDate.format("Do MMM YYYY");
};
