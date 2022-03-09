// import { csrfFetch } from "./csrf";

// /* ----- ACTIONS ------ */
// const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
// export const loadBookings = (bookings) => {
//   return {
//     type: LOAD_BOOKINGS,
//     bookings,
//   };
// };

// const ADD_BOOKING = "bookings/ADD_BOOKING";
// export const addBooking = (booking) => {
//   return {
//     type: ADD_BOOKING,
//     booking,
//   };
// };

// const DELETE_BOOKING = "bookings/DELETE_BOOKING";
// export const deleteBooking = (booking) => {
//   return {
//     type: DELETE_BOOKING,
//     booking,
//   };
// };

// /* ----- THUNK ------ (communicates to backend api and retrieves it) */
// export const getBookings = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

//   if (response.ok) {
//     const bookings = await response.json();
//     dispatch(loadBookings(bookings)); // this is the action that is passed into the reduces
//   }
// };

// export const createBooking = (payload) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(addBooking(data));
//     return data; // or return null
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ["An error occurred. Please try again."];
//   }
// };

// export const updateBooking = (payload) => async (dispatch) => {
//   const response = await csrfFetch(
//     `/api/spots/${payload.spotId}/bookings/${payload.id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(addBooking(data));
//     return data;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ["An error occurred. Please try again."];
//   }
// };

// export const removeBooking = (payload) => async (dispatch) => {
//   const response = await csrfFetch(
//     `/api/spots/${payload.spotId}/bookings/${payload.id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(deleteBooking(data));
//   }
// };

// /* ------ REDUCER ------ */
// export default function bookingReducer(state = {}, action) {
//   let newState = {};
//   switch (action.type) {
//     case LOAD_BOOKINGS: {
//       action.bookings.forEach((booking) => {
//         newState[booking.id] = booking;
//       });
//       return newState;
//     }
//     case ADD_BOOKING: {
//       return (newState = { ...state, [action.booking.id]: action.booking });
//     }
//     case DELETE_BOOKING: {
//       newState = { ...state };
//       delete newState[action.booking];
//       return newState;
//     }
//     default:
//       return state;
//   }
// }
