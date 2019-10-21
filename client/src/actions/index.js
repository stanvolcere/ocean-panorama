import axios from "axios";
import { reset } from 'redux-form';
import {
  FETCH_USER,
  FETCH_ROOMS,
  FETCH_ROOM,
  FETCH_BOOKINGS,
  FETCH_BLOCKED_DATES,
  FETCH_BOOKING,
  CHANGE_DATEPICKER_DATES,
  FETCH_AUTH_TOKEN,
  SET_FLASH_MESSAGE
} from "./types";
import history from "../history";
import baseRequest from "../apis/baseUrl";

///// AUTH
// fetches the cirrently signed in user if there is one
export const fetchUser = () => async (dispatch, getState) => {
  const res = await baseRequest.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signOut = () => async dispatch => {
  const res = await baseRequest.get("/api/logout");
  //clear the local storage for token
  localStorage.removeItem("token");
  dispatch({ type: FETCH_AUTH_TOKEN, payload: res.data });
  dispatch({ type: SET_FLASH_MESSAGE, payload: "Logged Out." });
};

export const saveToken = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/current_user_token");
    localStorage.setItem("token", res.data.token);
    dispatch({ type: FETCH_AUTH_TOKEN, payload: res.data.token });
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Log in was successful." });
  } catch (e) {
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Log In failed. Please try again." });
  }

};

//// Bookings
export const fetchBookings = () => async (dispatch, getState) => {
  const res = await baseRequest.get("/api/bookings");
  dispatch({ type: FETCH_BOOKINGS, payload: res.data });
};

export const fetchBooking = id => async dispatch => {
  const res = await baseRequest.get(`/api/bookings/${id}`);
  dispatch({ type: FETCH_BOOKING, payload: res.data });
};

export const createBooking = bookingValues => async dispatch => {
  console.log(bookingValues);

  const { bookingEndDate, bookingStartDate, price, numberOfGuests } = bookingValues;
  if (bookingEndDate && bookingStartDate && price && numberOfGuests) {
    try {
      await baseRequest.post(`/api/bookings/`, bookingValues);

      //empties our datepicker selected dates fromm the Redux store
      dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
      dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking Successful." });
      history.push("/bookings");
    } catch (e) {
      dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking could not be completed." });
      console.log(e);
    }
  } else {
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Please enter all details to complete booking." });
  }
};

export const cancelBooking = id => async dispatch => {
  try {
    await baseRequest.delete(`/api/bookings/` + id);
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking Cancelled Successfully." });
    history.push("/bookings");
  } catch (e) {
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking Cancellation could not be completed." });
  }

};


// ROOMS
export const fetchRooms = () => async dispatch => {
  const res = await baseRequest.get("/api/rooms");
  dispatch({ type: FETCH_ROOMS, payload: res.data });
};

export const fetchRoom = id => async (dispatch) => {
  const res = await axios.get(`/api/rooms/${id}`);
  dispatch({ type: FETCH_ROOM, payload: res.data })
};

export const fetchBlockedDates = roomId => async dispatch => {
  const res = await baseRequest.get(`/api/bookings/blocked/${roomId}`);
  dispatch({ type: FETCH_BLOCKED_DATES, payload: res.data });
};

export const updateDatePickerDates = dateValues => async dispatch => {
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: dateValues });
};

export const updateBookingDates = (
  id,
  newDatesChangeValues
) => async dispatch => {
  try {
    await baseRequest.patch(`/api/bookings/${id}`, newDatesChangeValues);
    dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking date change was successful." });
    history.push("/bookings/" + id);
  } catch (e) {
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Booking date change could not be completed." });
    console.log(e);
  }

};

export const clearSelectedDates = () => async dispatch => {
  dispatch({ type: CHANGE_DATEPICKER_DATES, payload: {} });
}

// Enquiry
export const sendEnquiry = formValues => async dispatch => {
  try {
    await baseRequest.post(`/api/sendenquiry`, formValues);
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Your enquiry has been sent." });
    dispatch(reset('enquiryForm'));
    history.push("/rooms/0");
  } catch (e) {
    dispatch({ type: SET_FLASH_MESSAGE, payload: "Sorry, we had an error processing." });
    history.push("/");
  }

}

// flash meassege
export const clearFlashMessage = () => async dispatch => {
  dispatch({ type: SET_FLASH_MESSAGE, payload: null });
}

// PAYMENTS
export const handleToken = (token) => async dispatch => {
  // note: the token needed by Stripe servers (for verifying the card being used) is located on token.id
  console.log(token);

  // const res = await axios.post('/api/stripe', { ...token, ...price });
  // console.log(res);
  // dispatch({ type: FETCH_USER, payload: res.data });
}