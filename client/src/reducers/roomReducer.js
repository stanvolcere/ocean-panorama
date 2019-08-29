import { FETCH_ROOM, FETCH_ROOMS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ROOMS:
            return action.payload;
        case FETCH_ROOM:
            return action.payload;
        default:
            return state;
    }
}