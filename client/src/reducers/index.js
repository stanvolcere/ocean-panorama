import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import roomReducer from "./roomReducer";
import bookingReducer from "./bookingReducer";
import blockedDatesReducer from "./blockedDatesReducer";
import datePickerDatesReducer from "./datePickerDatesReducer";
import authTokenReducer from "./authTokenReducer";
import flashMessageReducer from "./flashMessageReducer";

// the index.js mostly responsible for the redux set up stuff
export default combineReducers({
  auth: authReducer,
  rooms: roomReducer,
  bookings: bookingReducer,
  blockedDates: blockedDatesReducer,
  datePickerDates: datePickerDatesReducer,
  form: formReducer,
  authToken: authTokenReducer,
  flashMessage: flashMessageReducer
});
