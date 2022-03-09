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
  console.log("spot", spot);

  const bookings = spot?.Bookings;
  const reviews = spot?.Reviews;

  const date = (bookingTime) =>
    new Date(bookingTime).toLocaleDateString("en-US");
  const time = (bookingTime) =>
    new Date(bookingTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <DeleteSpotForm spot={spot} />
      <EditSpotForm spot={spot} />
      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Reservation Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Number of Guests</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => {
            return (
              <tr key={booking?.id}>
                <td>{booking?.id}</td>
                <td>{booking?.User?.firstName}</td>
                <td>{date(booking?.startTime)}</td>
                <td>{time(booking?.startTime)}</td>
                <td>{time(booking?.endTime)}</td>
                <td>{booking?.numGuests}</td>
                <td>${booking?.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Reviews</h2>
      {reviews?.map((review) => {
        return (
          <div key={review.id}>
            <ul>
              <li>User: {review?.User.firstName}</li>
              <li>Rating: {review?.rating}</li>
              <li>{review?.comment}</li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
