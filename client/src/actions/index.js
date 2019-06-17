import axios from 'axios';
import { FETCH_USER, FETCH_ROOMS } from "./types";

// fetches the cirrently signed in user if there is one
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBookings = () => async dispatch => {
    const res = await axios.get('/api/bookings');
    console.log(res);
};

export const fetchBooking = (id) => async dispatch => {
    const res = await axios.get(`/api/bookings/${id}`);
    console.log(res);
};

export const createBooking = (bookingValues) => async dispatch => {
    const res = await axios.post(`/api/bookings/`, bookingValues);
    console.log(res);
    //console.log(bookingValues);
}

export const fetchRooms = () => async dispatch => {
    const res = await axios.get('/api/rooms');
    dispatch({ type: FETCH_ROOMS, payload: res.data });
};

export const fetchRoom = (id) => async dispatch => {
    const res = await axios.get(`/api/rooms/${id}`);
    console.log(res);
};
