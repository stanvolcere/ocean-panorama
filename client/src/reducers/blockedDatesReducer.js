import { FETCH_BLOCKED_DATES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKED_DATES:
      return action.payload;
    default:
      return state;
  }
}
