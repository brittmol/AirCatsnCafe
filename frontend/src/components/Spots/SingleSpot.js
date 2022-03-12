import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import DisplayReservations from "./Reservations/ReservationsTable";
import DisplayReviews from "./Reviews/SingleSpotReviews";
import CreateReservationForm from "./Reservations/CreateReservation";
import CreateReviewForm from "./Reviews/CreateReview";

export default function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];
  // console.log("spot", spot);

  return (
    <>
      <hr />
      <CreateReservationForm spot={spot} />
      <hr />
      <EditSpotForm spot={spot} />
      <hr />
      <DisplayReservations spot={spot} sessionUser={sessionUser} />
      <hr />
      <CreateReviewForm spot={spot} />
      <DisplayReviews spot={spot} />
      <hr />
    </>
  );
}
