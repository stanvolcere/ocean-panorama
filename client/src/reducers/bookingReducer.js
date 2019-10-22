import { FETCH_BOOKINGS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return action.payload;

    default:
      return state;
  }
}
