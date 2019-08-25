import axios from "axios";
import {
  FETCH_USER,
  FETCH_ROOMS,
  FETCH_BOOKINGS,
  FETCH_BLOCKED_DATES,
  FETCH_BOOKING,
  CHANGE_DATEPICKER_DATES,
  FETCH_AUTH_TOKEN
} from "./types";
import history from "../history";
import baseUrl from "../apis/baseUrl";

///// AUTH
// fetches the cirrently signed in user if there is one
export const fetchUser = () => async dispatch => {
  const res = await baseUrl.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signOut = () => async dispatch => {
  const res = await baseUrl.get("/api/logout");
  //clear the local storage for token
  await localStorage.removeItem("token");
  dispatch({ type: FETCH_AUTH_TOKEN, payload: res.data });
};

export const saveToken = () => async dispatch => {
  const res = await axios.get("/api/current_user_token");
  localStorage.setItem("token", res.data.token);
  dispatch({ type: FETCH_AUTH_TOKEN, payload: res.data.token });
};

//// Bookings

export const fetchBookings = () => async dispatch => {
  const res = await axios.get("/api/bookings");
  dispatch({ type: FETCH_BOOKINGS, payload: res.data });
};

export const fetchBooking = id => async dispatch => {
  const res = await axios.get(`/api/bookings/${id}`);
  dispatch({ type: FETCH_BOOKING, payload: res.data });
};

export const createBooking = bookingValues => async dispatch => {
  await axios.post(`/api/bookings/`, bookingValues);

  //empties our datepicker selected dates fromm the Redux store
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
  history.push("/bookings");
};

export const cancelBooking = id => async dispatch => {
  await axios.delete(`/api/bookings/` + id);
  history.push("/bookings");
};


// ROOMS
export const fetchRooms = () => async dispatch => {
  const res = await axios.get("/api/rooms");
  dispatch({ type: FETCH_ROOMS, payload: res.data });
};

export const fetchRoom = id => async dispatch => {
  await axios.get(`/api/rooms/${id}`);
};

export const fetchBlockedDates = roomId => async dispatch => {
  const res = await axios.get(`/api/bookings/blocked/${roomId}`);
  dispatch({ type: FETCH_BLOCKED_DATES, payload: res.data });
};

export const updateDatePickerDates = dateValues => async dispatch => {
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: dateValues });
};

export const updateBookingDates = (
  id,
  newDatesChangeValues
) => async dispatch => {
  await axios.patch(`/api/bookings/${id}`, newDatesChangeValues);
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
  history.push("/bookings/" + id);
};

export const clearSelectedDates = () => async dispatch => {
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
}

// ADMIN
export const adminSignIn = formValues => async dispatch => {
  console.log(formValues);
}
