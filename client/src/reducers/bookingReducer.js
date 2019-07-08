import { FETCH_BOOKINGS, FETCH_BOOKING } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return action.payload;
    default:
      return state;
  }
}
