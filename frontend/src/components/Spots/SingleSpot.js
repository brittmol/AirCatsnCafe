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
  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];
  // console.log("spot", spot);

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <DeleteSpotForm spot={spot} />
      <EditSpotForm spot={spot} />
      <ul>
        <li>Host: {spot?.User?.firstName}</li>
        <li>{spot?.description}</li>
        <li>Price per Hour: ${spot?.hrPrice}</li>
        <li>
          Address: {spot?.address} {spot?.city}, {spot?.state} {spot?.zipCode}
        </li>
      </ul>
      <DisplayReservations spot={spot} sessionUser={sessionUser} />
      <DisplayReviews spot={spot} />
    </>
  );
}
