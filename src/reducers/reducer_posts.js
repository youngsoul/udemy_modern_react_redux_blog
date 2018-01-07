import _ from 'lodash';
import { FETCH_POSTS} from "../actions";
import { FETCH_POST, DELETE_POST} from "../actions";

export default function(state={}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // setup default state, when it first runs
            return _.mapKeys(action.payload.data, 'id');

        case FETCH_POST:
            const post = action.payload.data;
            const newState = {...state }; // get a copy of the existing state values. similar to cloning the object
            newState[post.id] = post; // add to the clone of the existing state, a new state value for post.id

            // same as ES6
            // { ...state, [action.payload.data.id]: action.payload.data }
            return newState;

        case DELETE_POST:
            // return a new state object, with the action.payload key removed from the new state object
            // 'omit' (remove) the key (property) action.payload (which we set to be post_id in action)
            return _.omit(state, action.payload);

        default:
            return state;
    }
}