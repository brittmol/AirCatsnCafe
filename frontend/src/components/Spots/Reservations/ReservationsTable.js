import React, { useState } from "react";
import EditBooking from "./EditBooking";

function DisplayReservations({ spot, sessionUser }) {
  const bookings = spot?.Bookings;

  const [clickShowRes, setClickShowRes] = useState(true);

  let reservations;
  if (clickShowRes) {
    reservations = (
      <div>
        <h2>
          Reservations
          <button onClick={() => setClickShowRes(false)}>Hide</button>
        </h2>
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
              return <EditBooking key={booking?.id} booking={booking} />;
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    reservations = (
      <h2>
        Reservations<button onClick={() => setClickShowRes(true)}>Show</button>
      </h2>
    );
  }

  return <>{spot?.hostId === sessionUser?.id ? reservations : null}</>;
}

export default DisplayReservations;
