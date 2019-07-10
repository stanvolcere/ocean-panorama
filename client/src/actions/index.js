import axios from "axios";
import {
  FETCH_USER,
  FETCH_ROOMS,
  FETCH_BOOKINGS,
  FETCH_BLOCKED_DATES,
  FETCH_BOOKING,
  CHANGE_DATEPICKER_DATES
} from "./types";
import history from "../history";

// fetches the cirrently signed in user if there is one
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBookings = () => async dispatch => {
  const res = await axios.get("/api/bookings");
  dispatch({ type: FETCH_BOOKINGS, payload: res.data });
};

export const fetchBooking = id => async dispatch => {
  const res = await axios.get(`/api/bookings/${id}`);
  dispatch({ type: FETCH_BOOKING, payload: res.data });
};

export const createBooking = bookingValues => async dispatch => {
  const res = await axios.post(`/api/bookings/`, bookingValues);
  console.log(res.data);
  history.push("/bookings");
};

export const cancelBooking = id => async dispatch => {
  const res = await axios.delete(`/api/bookings/` + id);
  history.push("/bookings");
};

export const fetchRooms = () => async dispatch => {
  const res = await axios.get("/api/rooms");
  dispatch({ type: FETCH_ROOMS, payload: res.data });
};

export const fetchRoom = id => async dispatch => {
  const res = await axios.get(`/api/rooms/${id}`);
  console.log(res);
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
  const res = await axios.patch(`/api/bookings/${id}`, newDatesChangeValues);
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
  history.push("/bookings/" + id);
};
