import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import DeleteSpotForm from "./DeleteSpotForm";

export default function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch, spotId]);

  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];
  const bookings = spot?.Bookings;
  console.log("spot", spot);
  console.log("bookings", bookings);
  bookings?.map((booking) => console.log("x", booking.id, booking));

  const date = (bookingTime) =>
    new Date(bookingTime).toLocaleDateString("en-US");
  const time = (bookingTime) =>
    new Date(bookingTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  console.log("date", date, "time", time);
  // console.log("first booking user", spot?.Bookings[0]?.User)

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <h2>Reservations</h2>
      {/* {bookings?.map((booking) => {
        return (
          <div key={booking.id}>
            {booking.id}, {date(booking?.startTime)}, {time(booking?.startTime)}{" "}
            - {time(booking?.endTime)}
          </div>
        );
      })} */}
      <table>
        <tr>
          <th>Reservation Id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Number of Guests</th>
          <th>Price</th>
        </tr>
        {bookings?.map((booking) => {
          return (
            <tr>
              <td>{booking?.id}</td>
              <td>{booking?.User?.firstName}</td>
              <td>{date(booking?.startTime)}</td>
              <td>{time(booking?.startTime)}</td>
              <td>{time(booking?.endTime)}</td>
              <td>{booking?.numGuests}</td>
              <td>{booking?.price}</td>
            </tr>
          );
        })}
      </table>
      <DeleteSpotForm spot={spot} />
      <EditSpotForm spot={spot} />
    </>
  );
}
