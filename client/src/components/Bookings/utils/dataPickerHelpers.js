import moment from "moment";

export const displayDate = date => {
  return moment(date).format("Do MMM YYYY");
};

export const getDateDiff = (startDate, endDate) => {
  return endDate.diff(startDate, "days");
};
