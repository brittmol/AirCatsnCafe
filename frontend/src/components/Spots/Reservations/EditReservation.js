// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateBooking, getSpots } from "../../../store/spots";

// function EditExample() {
//   const dispatch = useDispatch();
//   const spots = useSelector((store) => store.spotReducer);
//   const sessionUser = useSelector((state) => state.session.user);

//   const spot = spots[8];

//   useEffect(() => {
//     dispatch(getSpots());
//   }, [dispatch]);

//   //   useEffect(() => {
//   //     dispatch(updateBooking(payload));
//   //   });

//   const [data, setData] = useState([]);

//   const [inEditMode, setInEditMode] = useState({
//     status: false,
//     rowKey: null,
//   });

//   // edit: startTime, endTime, numGuests
//   // re-render: hours, price
//   const [numGuests, setNumGuests] = useState(null);
//   const [hrs, setHrs] = useState(null);
//   const [price, setPrice] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   console.log("num guests", numGuests);

//   const onEdit = ({ id, currentNumGuests }) => {
//     setInEditMode({
//       status: true,
//       rowKey: id,
//     });
//     setNumGuests(currentNumGuests);
//   };

//   const onCancel = () => {
//     setInEditMode({
//       status: false,
//       rowKey: null,
//     });
//     setNumGuests(null);
//   };

//   const onSave = ({ id }) => {
//     // e.preventDefault();
//     const payload = {
//       id,
//       spotId: spot.id,
//       userId: sessionUser.id,
//       startTime: startDate,
//       endTime: endDate,
//       hours: hrs,
//       numGuests,
//       price,
//     };
//     dispatch(updateBooking(payload));
//   };

//   const bookings = spot?.Bookings;

//   const date = (bookingTime) =>
//     new Date(bookingTime).toLocaleDateString("en-US");
//   const time = (bookingTime) =>
//     new Date(bookingTime).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div>
//       <h2>Reservations</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Res Id</th>
//             <th>Spot</th>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Start Time</th>
//             <th>End Time</th>
//             <th>Hours</th>
//             <th>Guests</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings?.map((booking) => {
//             return (
//               <tr key={booking?.id}>
//                 <td>{booking?.id}</td>
//                 <td>{booking?.Spot?.title}</td>
//                 <td>{booking?.User?.firstName}</td>
//                 <td>{date(booking?.startTime)}</td>
//                 <td>{time(booking?.startTime)}</td>
//                 <td>{time(booking?.endTime)}</td>
//                 <td>{booking?.hours}</td>
//                 {/* <td>{booking?.numGuests}</td> */}
//                 <td>
//                   {inEditMode.status && inEditMode.rowKey === booking?.id ? (
//                     <input
//                       value={numGuests}
//                       onChange={(e) => setNumGuests(e.target.value)}
//                     />
//                   ) : (
//                     booking?.numGuests
//                   )}
//                 </td>
//                 <td>${booking?.price}</td>

//                 <td>
//                   {inEditMode.status && inEditMode.rowKey === booking?.id ? (
//                     <>
//                       {/* <button
//                             onClick={() =>
//                                 onSave({
//                                     id: booking?.id,
//                                     newNumGuests: booking?.numGuests,
//                                 })
//                             }
//                             >
//                             Save
//                             </button> */}
//                       <button
//                         onClick={() => onSave({ id: booking?.id })}
//                       >
//                         Save
//                       </button>
//                       <button onClick={() => onCancel()}>X</button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() =>
//                         onEdit({
//                           id: booking?.id,
//                           currentNumGuests: booking?.numGuests,
//                         })
//                       }
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </td>
//                 {/* <td>
//                         <button>Edit</button>
//                         </td> */}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   //   return (
//   //     <>
//   //       <h2>Edit Example</h2>
//   //     </>
//   //   );
// }

// export default EditExample;
