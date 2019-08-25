import { FETCH_AUTH_TOKEN } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_AUTH_TOKEN:
            return action.payload || false;
        default:
            return state;
    }
}