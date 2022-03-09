import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

const ADD_SPOT = "spots/ADD_SPOT";
export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const DELETE_SPOT = "spots/DELETE_SPOT";
export const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot,
  };
};

const ADD_BOOKING = "spots/bookings/ADD_BOOKING";
export const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
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

export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const removeSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data));
  }
};


export const createBooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addBooking(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

/* ------ REDUCER ------ */
export default function spotReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOTS: {
      // console.log('Bookings in action', action.spots[0].Bookings)
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case ADD_SPOT: {
      return (newState = { ...state, [action.spot.id]: action.spot });
    }
    case DELETE_SPOT: {
      newState = { ...state };
      delete newState[action.spot];
      return newState;
    }
    case ADD_BOOKING: {
      newState = { ...state }
      return newState;
      // return (newState = { ...state, [action.booking.id]: action.booking });
    }
    default:
      return state;
  }
}
