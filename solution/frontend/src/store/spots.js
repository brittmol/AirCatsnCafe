import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_SPOTS = "spots/LOAD_SPOTS";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots)); // this is the action that is passed into the reduces
  }
};

/* ------ REDUCER ------ */
export default function spotReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOTS: {
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    default:
      return state;
  }
}
