import React, { useState } from "react";

function DisplayReservations({ spot, sessionUser }) {
  const [clickShowRes, setClickShowRes] = useState(false);

  const bookings = spot?.Bookings;

  const date = (bookingTime) =>
    new Date(bookingTime).toLocaleDateString("en-US");
  const time = (bookingTime) =>
    new Date(bookingTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  let reservations;
  if (clickShowRes) {
    reservations = (
      <div>
        <h2>Reservations<button onClick={() => setClickShowRes(false)}>Hide</button></h2>
        <table>
          <thead>
            <tr>
              <th>Res Id</th>
              <th>Spot</th>
              <th>Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours</th>
              <th>Guests</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => {
              return (
                <tr key={booking?.id}>
                  <td>{booking?.id}</td>
                  <td>{booking?.Spot?.title}</td>
                  <td>{booking?.User?.firstName}</td>
                  <td>{date(booking?.startTime)}</td>
                  <td>{time(booking?.startTime)}</td>
                  <td>{time(booking?.endTime)}</td>
                  <td>{booking?.hours}</td>
                  <td>{booking?.numGuests}</td>
                  <td>${booking?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    reservations = (
      <h2>Reservations<button onClick={() => setClickShowRes(true)}>Show</button></h2>
    );
  }

  return <>{spot?.hostId === sessionUser?.id ? reservations : null}</>;
}

export default DisplayReservations;
