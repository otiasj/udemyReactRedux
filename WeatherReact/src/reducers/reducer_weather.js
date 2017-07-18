import { FETCH_WEATHER } from '../actions/index'

export default function (state = [], action) {
    console.log('action received', action);

    switch (action.type) {
        case FETCH_WEATHER:
            //return state.concat([action.payload.data]);
            return [action.payload.data, ...state];
        default:
            console.log('Unknown action');
    }
    return state;
}