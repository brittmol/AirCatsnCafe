import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import DeleteSpotForm from "./DeleteSpotForm";
import DisplayReservations from "./Reservations/ReservationsTable";
import DisplayReviews from "./Reviews/SingleSpotReviews";

export default function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch, spotId]);

  const sessionUser = useSelector((state) => state.session.user);
  console.log('sessonUser', sessionUser)
  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];
  // console.log("spot", spot);

  const reviews = spot?.Reviews;

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <div>
        <DeleteSpotForm spot={spot} />
        <EditSpotForm spot={spot} />
      </div>
      <ul>
        <li>Host: {spot?.User?.firstName}</li>
        <li>{spot?.description}</li>
        <li>Price per Hour: ${spot?.hrPrice}</li>
        <li>
          Address: {spot?.address} {spot?.city}, {spot?.state} {spot?.zipCode}
        </li>
      </ul>
      <div>
        <DisplayReservations spot={spot} sessionUser={sessionUser}/>
      </div>
      <div>
        <DisplayReviews spot={spot}/>
      </div>
      {/* <h2>Reviews</h2>
      {reviews?.map((review) => {
        return (
          <div key={review.id}>
            <ul>
              <li>User: {review?.User.firstName}</li>
              <li>Spot: {review?.Spot?.title}</li>
              <li>Rating: {review?.rating}</li>
              <li>{review?.comment}</li>
            </ul>
          </div>
        );
      })} */}
    </>
  );
}
