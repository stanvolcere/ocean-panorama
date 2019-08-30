import { SET_FLASH_MESSAGE } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case SET_FLASH_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}